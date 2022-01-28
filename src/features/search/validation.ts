export { validateUsername };

function validateUsername(username: string) {
  username = username.trim();

  if (username.search(invalidUsernameChars) >= 0) {
    return (
      "Username may only contain alphanumeric characters or single hyphens, " +
      "and cannot begin or end with a hyphen."
    );
  }

  return null;
}

const invalidUsernameChars = /[^-a-zA-Z0-9]|--|^-|-$/;
