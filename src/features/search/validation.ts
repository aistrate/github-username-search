export { usernameValidationError };

function usernameValidationError(username: string) {
  if (username.trim().search(invalidUsernameChars) >= 0) {
    return (
      "Username may only contain alphanumeric characters or single hyphens, " +
      "and cannot begin or end with a hyphen."
    );
  }

  return null;
}

const invalidUsernameChars = /[^-a-zA-Z0-9]|--|^-|-$/;
