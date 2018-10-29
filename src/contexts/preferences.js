import React from 'react';

const defaultPreferences = {
  totalWords: 5,
  updatePreferences: () => {},
};

const PreferencesContext = React.createContext(defaultPreferences);

export default PreferencesContext;