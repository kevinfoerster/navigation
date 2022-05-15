import { useMachine } from '@xstate/react';
import { assign } from 'xstate';
import { createMachine } from 'xstate';

const navigationMachine = 
/** @xstate-layout N4IgpgJg5mDOIC5QBcD2UoBswDoCWE2AxKgA5gB2AcgIYBueUNyeqFiopqseLbHIAB6IAtAGYAbAEYcAVgAsADgAMAJmXypi+askAaEAE9Rq1bJzqt2nYqnKxATgC+Tg2gzYcFeo2asKAPLkFDiwABaoAO54FFAAYngATrDIADJgdGCYtAxMfBREAMaYeIUA1jm++QCSyGAAtgJcPPkCwggi8gDsyjjyCpoOyrIOdsoSBsYIYzgODrb2UmLail1mLm7oWLjeuX5sQZShYIVsEOmZ2T55-qER0bEAyidnF1mVN2xFJeUf+xS1BpNbi8fxtRBSCQ4SRdLoSJRDKR2VRSSaIeQ6HBwhxdeQSZRSUZdEYbEDubZea7-Q4hWAvCjnDLvKn5O5RGJQZ6nBlvK57fLfUplABCNHKqRiZWBLTBSCEiDEXQsBKRXWW8jE4zEYjRCB60NUiNUXS0hLxYlJ5M8uyq-hp324YD+rTlzVB-Dl7REUiUOHhDlkimNYh9GPkupEpnMlkU1lUC0cLlcIAoqAgcAEVtwBGw0vd7E9ojEmKkPXkQwckjxSwmRiL8b6seU2kVskD9ktW2tLLtwTZD3iSRSvOdss4IJdoC9si0OEUEgXKMV8IXigjbdmKPLEhUEnUslhnY8Ox7Bz7dO5jMuo7Y-Y5XNeTL5to945lr-lHX6WPUKkUDkNHpxlROsEDEQ0+nhMRZBRFRulxI8KRtT5AnPekr2ZflbgABRoGAABVUGdMA80nT8lQcctNFgzUANUctZF1NsHCxKRYPsUZ7AkC1kyzSksLPI4L0fa9TwLN983BDoJBYtZm2bACcWUYDdTMKFumLdQJC6OYZJ4zZj34l9UKOXCCKIlkSNdCcx0-SNxmhVZdBNXE4NjXUfXUk14zVec8SDWREO7ASTPEkA3TI6dMXnRcljhPEdwjNjFFmNjHHheNhhxCQgqsiTItEWQFznBc9zildEtAzoCT6Lp-042wDwceEkycIA */
createMachine({
  id: "toggle",
  initial: "idle",
  context: {
    openNavigationIndex: null
  },
  states: {
    idle: {
      on: {
        openNavigation: {
          target: "navigationOpen",
        },
      },
    },
    navigationOpen: {
      initial: "showingFirstLevelNavigation",
      states: {
        showingFirstLevelNavigation: {
          on: {
            clickNavigationItem: [
              {
                cond: "isLink",
                target: "PageToNavigate",
              },
              {
                actions: "setOpenNavigationIndex",
                target: "secondLevelNavigation",
              },
            ],
          },
        },
        secondLevelNavigation: {
          initial: "showingSecondLevelNavigation",
          states: {
            showingSecondLevelNavigation: {
              on: {
                clickNavigationItem: {
                  target: "PageToNavigate",
                },
                clickBackLink: {
                  target: "#toggle.navigationOpen.showingFirstLevelNavigation",
                },
              },
            },
            PageToNavigate: {
              type: "final",
            },
          },
        },
        PageToNavigate: {
          type: "final",
        },
      },
      on: {
        closeNavigation: {
          target: "idle",
        },
      },
    },
  },
},
{
    guards: {
        isLink: (context, event) => event.isLink
    },
    actions: {
      setOpenNavigationIndex: assign({
        openNavigationIndex:   (context, event) => event.itemIndex
      })
    }
});


export { navigationMachine}