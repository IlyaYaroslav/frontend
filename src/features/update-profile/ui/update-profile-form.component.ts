import { ChangeDetectionStrategy, Component, computed, DestroyRef, effect, inject, input, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { form, minLength, pattern, required, submit } from '@angular/forms/signals';
import type { UpdateUserProfileRequest, UpdateUserProfileResponse, UserModel } from '@entities/user';
import { UserActions } from '@entities/user';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { NAME_PATTERN } from '@shared/regex';
import { InputStringComponent } from '@shared/ui/input-string';
import { ButtonDirective } from 'primeng/button';
import type { UpdateProfileFormModel } from '../model/update-profile-form.model';

@Component({
  selector: 'app-update-profile-form',
  imports: [
    InputStringComponent,
    ButtonDirective,
  ],
  templateUrl: './update-profile-form.component.html',
  styleUrl: './update-profile-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UpdateProfileFormComponent {
  private readonly store = inject(Store);
  private readonly actions$ = inject(Actions);
  private readonly destroyRef = inject(DestroyRef);

  readonly userData = input<UserModel | null>(null);

  protected readonly submitted = signal(false);

  protected readonly model = signal<UpdateProfileFormModel>({
    firstName: '',
    lastName: '',
  });

  protected readonly initialData = signal<UpdateProfileFormModel>({
    firstName: '',
    lastName: '',
  });

  protected readonly userEmail = computed(() => this.userData()?.email ?? '');
  protected readonly userRole = computed(() => this.userData()?.role ?? '');

  protected readonly isFirstNameDirty = computed(() => this.updateProfileForm.firstName().dirty());
  protected readonly isLastNameDirty = computed(() => this.updateProfileForm.lastName().dirty());
  protected readonly hasChanges = computed(() => this.isFirstNameDirty() || this.isLastNameDirty());

  protected readonly updateProfileForm = form(this.model, (path) => {
    required(path.firstName, { message: 'Введите имя' });
    minLength(path.firstName, 1, { message: 'Имя должно быть не короче 1 символа' });
    pattern(path.firstName, NAME_PATTERN, { message: 'Имя должно содержать только буквы, пробел, дефис или апостроф' });

    pattern(path.lastName, NAME_PATTERN, { message: 'Фамилия должна содержать только буквы, пробел, дефис или апостроф' });
  });

  protected readonly saving = signal(false);

  private readonly pendingPayload = signal<UpdateUserProfileRequest | null>(null);

  private readonly initializedUserId = signal<string | null>(null);

  constructor() {
    this.initializeFormFromUser();
    this.subscribeToProfileUpdateSuccess();
    this.subscribeToProfileUpdateFailure();
  }

  async onSubmit(event: SubmitEvent): Promise<void> {
    event.preventDefault();

    this.submitted.set(true);

    await submit(this.updateProfileForm, {
      onInvalid: (field) => {
        field().focusBoundControl();
      },
      action: async (field) => {
        const { firstName, lastName } = field().value();

        const payload: UpdateUserProfileRequest = {};

        if (this.isFirstNameDirty()) {
          payload.newFirstName = firstName;
        }

        if (this.isLastNameDirty()) {
          payload.newLastName = lastName;
        }

        this.pendingPayload.set(payload);
        this.saving.set(true);

        this.store.dispatch(UserActions.updateCurrentUser({ payload }));
      },
    });
  }

  protected resetForm(): void {
    this.model.set({
      firstName: this.initialData().firstName,
      lastName: this.initialData().lastName,
    });

    this.updateProfileForm().reset();
  }

  private applySavedProfile(patch: UpdateUserProfileResponse): void {
    const payload = this.pendingPayload();

    if (!payload) return;

    const initial = this.initialData();

    const nextData = {
      firstName: patch.firstName ?? payload.newFirstName ?? initial.firstName,
      lastName: patch.lastName ?? payload.newLastName ?? initial.lastName,
    };

    this.model.set(nextData);
    this.initialData.set(nextData);
    this.updateProfileForm().reset();

    this.saving.set(false);
    this.pendingPayload.set(null);
  }

  private initializeFormFromUser(): void {
    effect(() => {
      const user = this.userData();

      if (!user || this.initializedUserId() === user.id) {
        return;
      }

      const data: UpdateProfileFormModel = {
        firstName: user.firstName,
        lastName: user.lastName ?? '',
      };

      this.model.set(data);
      this.initialData.set(data);
      this.initializedUserId.set(user.id);
    });
  }

  private subscribeToProfileUpdateSuccess(): void {
    this.actions$.pipe(
      ofType(UserActions.updateCurrentUserSuccess),
      takeUntilDestroyed(this.destroyRef),
    )
      .subscribe(({ patch }) => this.applySavedProfile(patch));
  }

  private subscribeToProfileUpdateFailure(): void {
    this.actions$.pipe(
      ofType(UserActions.updateCurrentUserFailure),
      takeUntilDestroyed(this.destroyRef),
    ).subscribe(() => {
      if (!this.pendingPayload()) return;

      this.saving.set(false);
      this.pendingPayload.set(null);
    });
  }
}
