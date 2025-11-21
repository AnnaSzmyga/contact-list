export const getAvatarInitials = (name: string): string => {
  const words = name.trim().split(" ");
  const firstWord = words[0];
  const lastWord = words[words.length - 1];
  const initials = [firstWord[0], lastWord[0]].join("").toUpperCase();
  return initials;
};
