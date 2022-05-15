import { assign, createMachine } from 'xstate';

// eslint-disable-next-line operator-linebreak
const navigationMachine =
// eslint-disable-next-line max-len
/** @xstate-layout N4IgpgJg5mDOIC5QBcD2UoBswDoCWE2AxKgA5gB2AcgIYBueUNyeqFiopqseLbHIAB6IAtAGYAbAEYcAVgAsADgAMAJmXypi+askAaEAE9Rq1bJzqt2nYqnKxATgC+Tg2gzYcFeo2asKAPLkFDiwABaoAO54FFAAYngATrDIADJgdGCYtAxMfBREAMaYeIUA1jm++QCSyGAAtgJcPPkCwggi8gDsyjjyCpoOyrIOdsoSBsYIYzgODrb2UmLail1mLm7oWLjeuX5sQZShYIVsEOmZ2T55-qER0bEAyidnF1mVN2xFJeUf+xS1BpNbi8fxtRBSCQ4SRdLoSJRDKR2VRSSaIeQ6HBwhxdeQSZRSUZdEYbEDubZea7-Q4hWAvCjnDLvKn5O5RGJQZ6nBlvK57fLfUplABCNHKqRiZWBLTBSCEiDEXQsBKRXWW8jE4zEYjRCB60NUiNUXS0hLxYlJ5M8uyq-hp324YD+rTlzVB-Dl7REUiUOHhDlkimNYh9GPkupEpnMlkU1lUC0cLlcIAoqAgcAEVtwBGw0vd7E9ojEmKkPXkQwckjxSwmRiL8b6seU2kVskD9ktW2tLLtwTZD3iSRSvOdss4IJdoC9si0OEUEgXKMV8IXigjbdmKPLEhUEnUslhnY8Ox7Bz7dO5jMuo7Y-Y5XNeTL5to945lr-lHX6WPUKkUDkNHpxlROsEDEQ0+nhMRZBRFRulxI8KRtT5AnPekr2ZflbgABRoGAABVUGdMA80nT8lQcctNFgzUANUctZF1NsHCxKRYPsUZ7AkC1kyzSksLPI4L0fa9TwLN983BDoJBYtZm2bACcWUYDdTMKFumLdQJC6OYZJ4zZj34l9UKOXCCKIlkSNdCcx0-SNxmhVZdBNXE4NjXUfXUk14zVec8SDWREO7ASTPEkA3TI6dMXnRcljhPEdwjNjFFmNjHHheNhhxCQgqsiTItEWQFznBc9zildEtAzoCT6Lp-042wDwceEkycIA */
createMachine(
  {
    id: 'navigation',
    initial: 'idle',
    context: {
      openNavigationIndex: null,
    },
    states: {
      idle: {
        on: {
          openNavigation: [
            {
              target: 'navigationOpen.secondLevelNavigation',
              actions: 'setOpenNavigationIndex',
              cond: 'hasIndex',
            },
            {
              target: 'navigationOpen',
            }],
        },
      },
      navigationOpen: {
        initial: 'showingFirstLevelNavigation',
        states: {
          showingFirstLevelNavigation: {
            on: {
              clickNavigationItem: [
                {
                  actions: 'setOpenNavigationIndex',
                  target: 'secondLevelNavigation',
                },
              ],
            },
          },
          secondLevelNavigation: {
            initial: 'showingSecondLevelNavigation',
            states: {
              showingSecondLevelNavigation: {
                on: {
                  clickBackLink: {
                    target: '#navigation.navigationOpen.showingFirstLevelNavigation',
                  },
                },
              },
            },
          },
        },
        on: {
          closeNavigation: {
            target: 'idle',
          },
        },
      },
    },
  },
  {
    guards: {
      hasIndex: (context, event) => Boolean(event.itemIndex),
    },
    actions: {
      setOpenNavigationIndex: assign({
        openNavigationIndex: (context, event) => event.itemIndex,
      }),
    },
  },
);

// eslint-disable-next-line import/prefer-default-export
export { navigationMachine };
