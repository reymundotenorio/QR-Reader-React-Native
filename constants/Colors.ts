const tintColorLight = '#2F95DC';
const tintColorDark = '#F8F8FA';

export default {
  light: {
    text: '#0D1117',
    background: '#F2F6FF',
    tint: tintColorLight,
    tabIconDefault: '#CCCCCC',
    tabIconSelected: tintColorLight,

    tabBackgroundColor: '#FFFFFF',
    tabActiveColor: '#FE7D55',
    tabInactive: 'rgba(0,0,0,0.4)',

    inputBackground: 'rgba(255,255,255,0.75)',
    inputPlaceholderColor: 'rgba(0,0,0,0.4)',
    inputText: 'rgba(0,0,0,0.9)',
  },
  dark: {
    text: '#F8F8FA',
    background: '#1F1D2B',
    tint: tintColorDark,
    tabIconDefault: '#CCCCCC',
    tabIconSelected: tintColorDark,

    tabBackgroundColor: '#252836',
    tabActiveColor: '#FE7D55',
    tabInactive: 'rgba(255,255,255,0.6)',

    inputBackground: 'rgba(255,255,255,0.1)',
    inputPlaceholderColor: 'rgba(255,255,255,0.3)',
    inputText: 'rgba(255,255,255,0.9)',
  },
};
