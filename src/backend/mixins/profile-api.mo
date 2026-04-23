import Map "mo:core/Map";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import ProfileTypes "../types/profile";

mixin (
  accessControlState : AccessControl.AccessControlState,
  userProfiles : Map.Map<Principal, ProfileTypes.UserProfile>,
) {
  /// Get the caller's own profile
  public query ({ caller }) func getCallerUserProfile() : async ?ProfileTypes.UserProfile {
    userProfiles.get(caller)
  };

  /// Save or update the caller's profile
  public shared ({ caller }) func saveCallerUserProfile(
    profile : ProfileTypes.UserProfile
  ) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: must be logged in to save profile");
    };
    userProfiles.add(caller, profile);
  };

  /// Get another user's profile (admin or self)
  public query ({ caller }) func getUserProfile(
    user : Principal
  ) : async ?ProfileTypes.UserProfile {
    if (not Principal.equal(caller, user) and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: can only view your own profile");
    };
    userProfiles.get(user)
  };
};
