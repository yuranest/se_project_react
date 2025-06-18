import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";
import "./Profile.css";

const Profile = ({
  user,
  clothingItems,
  onCardClick,
  onAddClick,
  onSignOut,
  onEditProfile,
  onCardLike,
}) => {
  return (
    <main className="profile">
      <SideBar
        user={user}
        onSignOut={onSignOut}
        onEditProfile={onEditProfile}
      />
      <ClothesSection
        clothingItems={clothingItems}
        onCardClick={onCardClick}
        onAddClick={onAddClick}
        onCardLike={onCardLike}
      />
    </main>
  );
};

export default Profile;
