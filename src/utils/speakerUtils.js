const DEFAULT_PLACEHOLDER = 'iRiseHub Team';

const splitNames = (value) => {
  if (!value) return [];

  if (Array.isArray(value)) {
    return value
      .map((name) => (typeof name === 'string' ? name.trim() : ''))
      .filter((name) => name.length >= 2);
  }

  if (typeof value === 'string') {
    try {
      const parsed = JSON.parse(value);
      if (Array.isArray(parsed)) {
        return splitNames(parsed);
      }
    } catch (error) {
      // Not JSON, fall through to splitting logic
    }

    return value
      .split(/[\n,]/)
      .map((name) => name.trim())
      .filter((name) => name.length >= 2);
  }

  return [];
};

export const getSpeakerNames = (event, placeholder = DEFAULT_PLACEHOLDER) => {
  if (!event) return [placeholder];

  const normalizedNames = splitNames(event.speakers);
  if (normalizedNames.length) {
    return normalizedNames;
  }

  if (event.speakerName && typeof event.speakerName === 'string' && event.speakerName.trim().length >= 2) {
    return [event.speakerName.trim()];
  }

  if (event.presenter && typeof event.presenter === 'string' && event.presenter.trim().length >= 2) {
    return [event.presenter.trim()];
  }

  if (event.author && typeof event.author === 'string') {
    const author = event.author.trim();
    if (author.length >= 2 && author.toLowerCase() !== 'admin') {
      return [author];
    }
  }

  return [placeholder];
};

