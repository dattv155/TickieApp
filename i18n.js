import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import nameof from 'ts-nameof.macro';
import vi from 'src/i18n/vi.json';
import en from 'src/i18n/en.json';
import i18next from 'i18next';

i18next
  .use(initReactI18next)
  .init({
    lng: nameof(vi),
    fallbackLng: nameof(vi),
    ns: '',
    defaultNS: '',
  })
  .then((translate) => {
    this.translator = translate;
  });

i18next.addResources(nameof(vi), '', vi);
i18next.addResources(nameof(en), '', en);

export default i18n;
