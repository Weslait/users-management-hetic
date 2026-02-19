function isNotEmptyString(value) {
  return typeof value === 'string' && value.length > 0;
}

function isEmail(value) {
  return (
    typeof value === 'string' &&
    /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/.test(value)
  );
}
// Email regex validation : https://regex101.com/library/SOgUIV

function isStrongPassword(value) {
  return (
    typeof value === 'string' &&
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{};:,<.>])[A-Za-z\d!@#$%^&*()\-_=+{};:,<.>]{10,20}$/.test(
      value,
    )
  );
}
// Strong password regex : https://regex101.com/library/cOMsKw

export function validateUser(userData) {
  const errors = {};
  const data = {};

  if (userData.email !== undefined) {
    if (!isEmail(email)) errors.email = 'Email is invalid';
  }

  if (!isEmail(email)) errors.email = 'Email is invalid';
  if (!isStrongPassword(password))
    errors.password = 'Password must be 10-20 characters long.';
  if (!isNotEmptyString(name)) errors.name = 'Name is required';

  return {
    ok: Object.keys(errors).length === 0,
    errors,
    data: userData,
  };
}

export function validateUpdateUser(userData) {
  const errors = {};
  const data = {};

  if (userData.email !== undefined) {
    if (!isEmail(userData.email)) errors.email = 'Email is invalid';
    else data.email = userData.email;
  }

  if (userData.password !== undefined) {
    if (!isStrongPassword(userData.password))
      errors.password = 'Password is invalid';
    else data.password = userData.password;
  }

  if (userData.name !== undefined) {
    if (!isNotEmptyString(userData.name)) errors.name = 'Name is invalid';
    else data.name = userData.name;
  }

  return {
    ok: Object.keys(errors).length === 0,
    errors,
    data: userData,
  };
}
