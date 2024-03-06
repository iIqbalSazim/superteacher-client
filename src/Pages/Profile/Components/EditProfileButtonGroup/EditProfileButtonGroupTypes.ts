export interface EditProfileButtonGroupProps {
  editProfile: boolean;
  setEditProfile: (value: React.SetStateAction<boolean>) => void;
  setIsResetPasswordModalOpen: (value: React.SetStateAction<boolean>) => void;
}
