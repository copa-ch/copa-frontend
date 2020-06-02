export default {
  locale: {
    en: 'English',
    de: 'German',
  },
  common: {
    form: {
      required: 'This field cannot be left blank',
      email: 'This is not a valid email',
    },
    close: 'Close',
    copy: 'Copy',
    delete: 'Delete',
    save: 'Save',
  },
  home: {
    link: 'Home',
    title: 'Create amazing <br> tournaments',
    subtitle:
      'Get started today for free<br>A better way to manage your own tournament<br>Invite your participants, generate your schedule and much more',
    beta:
      'This app is still under development. So data will not be persisted permanently.',
    create: {
      title: 'Create Your Tournament',
      subtitle: "It's quick and easy",
      name: {
        label: 'What is the name of your tournament?',
        placeholder: 'Enter name',
      },
      owner: {
        label: 'Tell your participants who you are.',
        placeholder: 'Enter your name',
      },
      email: {
        label:
          'The email will only be used to send you a confirmation with the admin link.',
        placeholder: 'Enter your email',
      },
      submitButton: 'Create Tournament',
      inValidForm: 'Form is not valid! Please check the fields.',
      submitFailed:
        'We are sorry, that we could not create your tournament. Please check your inputs and retry it.',
    },
  },
  notFound: {
    title: '404',
    subtitle: 'This is not the Tournament your are looking for.',
  },
  teams: {
    title: 'Teams',
    add: {
      label: 'Team name',
      submit: 'Add Team',
      failed: 'Could not add team. Please try again later.',
    },
    description: {
      open:
        'As long as the Tournament is open you are able to add teams to it.',
    },
  },
  tournament: {
    title: 'Tournament',
    fixtures: {
      title: 'Fixtures',
    },
    ranking: {
      title: 'Ranking',
    },
    state: {
      open: {
        label: 'Open',
        hint: 'Tournament is in pre configure and registration phase',
      },
      playable: {
        label: 'Playable',
        hint: 'Tournament is configured and ready to be played'
      }
    },
    invitation: {
      title: 'Invite Participant',
      subtitle: 'Share this link with your participants.',
      snackbar: 'URL to share was successfully copied to your clipboard.',
      start: {
        title: "Let's start your Tournament",
        message:
          'Starting your tournament will close the team registration. After that you can enter the results of the games.',
        action: 'Start Tournament',
      },
    },
  },
  ranking: {
    title: 'Ranking',
    table: {
      position: 'Position',
      team: 'Team',
      played: 'Played',
      won: 'Won',
      drawn: 'Drawn',
      lost: 'Lost',
      goalsFor: 'Goals For',
      goalsAgainst: 'Goals Against',
      points: 'Points'
    }
  },
  games: {
    title: 'Fixtures',
    description: {
      open: 'Define your tournament mode & generate fixtures',
    },
    generate: 'Generate Schedule',
  },
  settings: {
    title: 'Settings',
    description: 'In this section you can update or delete your tournament.',
    update: {
      title: 'Update this tournament',
      name: {
        label: 'Name of your tournament',
      },
      owner: {
        label: 'Owner of your tournament',
      },
    },
    delete: {
      title: 'Delete this tournament',
      description:
        'Once you delete a tournament, there is no going back. Please be certain.',
    },
  },
  about: {
    link: 'About',
    title: 'About',
  },
  privacy: {
    link: 'Privacy',
    title: 'Privacy Policy for Copa',
  },
  footer: {
    app: 'App:',
    server: 'Server:',
  },
}
