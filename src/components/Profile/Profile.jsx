import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";
import "./Profile.css";

const Profile = ({
  user,
  clothingItems,
  onCardClick,
  onAddClick,
  onSignOut,
}) => {
  return (
    <main className="profile">
      <SideBar user={user} onSignOut={onSignOut} />
      <ClothesSection
        clothingItems={clothingItems}
        onCardClick={onCardClick}
        onAddClick={onAddClick}
      />
    </main>
  );
};

export default Profile;
