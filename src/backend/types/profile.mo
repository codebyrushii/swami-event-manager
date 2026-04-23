module {
  public type UserRole = { #admin; #staff; #client };

  public type UserProfile = {
    name : Text;
    phone : Text;
    email : Text;
    role : UserRole;
  };
};
