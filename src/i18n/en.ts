export default {
  locale: {
    en: 'English',
    de: 'German',
  },
  app: {
    title: 'Copa',
    motto: 'Create your tournament today!',
  },
  home: {
    form: {
      title: 'Create Your Tournament',
      name: {
        label: 'What is the name of your tournament?',
        placeholder: 'Enter title',
      },
      owner: {
        label: 'Let your participant know, who created this tournament.',
        placeholder: 'Enter your name',
      },
      email: {
        label: 'Tell us your email so we can sent you a mail with the confirmation and the admin link.',
        placeholder: 'Enter your email',
      },
      submitButton: 'Create Tournament',
      inValidForm: 'Form is not valid! Please check the fields.',
      submitFailed: 'We are sorry, that we could not create your tournament. Please check your inputs and retry it.',
    },
  },
  validators: {
    presence: 'This field cannot be left blank',
    email: 'This is not a valid email',
  },
}
