import MenuIcon from '@mui/icons-material/Menu';
import {
  Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText
} from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useMachine } from '@xstate/react';
import Head from 'next/head';
import React from 'react';
import { navigationMachine } from '../machines/navigationMachine';
// if (typeof window !== 'undefined') {

//   inspect({
//     // options
//     // url: 'https://stately.ai/viz?inspect', // (default)
//     iframe: false // open in new window
//   });
// }

const navStructure = [
  {
    name: 'Home',
    href: 'http://example.org',
  },
  {
    name: 'Brand',
    children: [
      {
        name: 'About',
        href: 'http://example.org',
      },
      {
        name: 'Company',
        href: 'http://example.org',
      },
    ],
  },
  {
    name: 'Products',
    children: [
      {
        name: 'Juice',
        href: 'http://example.org',
      },
      {
        name: 'Shots',
        href: 'http://example.org',
      },
    ],
  },
];

export default function Home() {
  const [state, send] = useMachine(navigationMachine, { devTools: false });
  const secondLevelNavigationItems = navStructure[state.context.openNavigationIndex] || [];
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />
      </Head>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Logo
            </Typography>
            <Box sx={{ display: 'flex' }}>
              {navStructure.map((navItem, index) => {
                const hasChildren = Boolean(navItem?.children);
                return hasChildren ? (
                  <Button
                    key={navItem.name}
                    variant="secondary"
                    onClick={() => send({ type: 'openNavigation', itemIndex: index })}
                  >
                    {navItem.name}
                  </Button>
                ) : (
                  <Button
                    key={navItem.name}
                    component={Button}
                    variant="secondary"
                    href="http://example.org"
                  >
                    {navItem.name}
                  </Button>
                );
              })}
            </Box>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={() => send({ type: 'openNavigation' })}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <pre>{JSON.stringify(state, null, 2)}</pre>
      </Box>
      <Drawer
        anchor="right"
        open={state.matches('navigationOpen')}
        onClose={() => send({ type: 'closeNavigation' })}
      >
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={() => { }}
          onKeyDown={() => { }}
        >
          <Button onClick={() => send({ type: 'closeNavigation' })}>Close</Button>
          <List>

            {state.matches(
              { navigationOpen: { secondLevelNavigation: 'showingSecondLevelNavigation' } },
            )
              ? (
                <>
                  <Button onClick={() => send({ type: 'clickBackLink' })}>Back</Button>
                  {secondLevelNavigationItems.children.map((navItem, index) => (
                    <ListItem key={navItem.name} disablePadding>
                      <ListItemButton href={navItem.href} component="a">
                        <ListItemIcon>
                          <MenuIcon />
                        </ListItemIcon>
                        <ListItemText primary={navItem.name} />
                      </ListItemButton>
                    </ListItem>
                  ))}
                </>
              )
              : navStructure.map((navItem, index) => {
                const hasChildren = Boolean(navItem?.children);
                const buttonProps = hasChildren ? {
                  onClick: () => send({ type: 'clickNavigationItem', itemIndex: index }),
                } : {
                  href: navItem.href,
                  component: 'a',
                };
                return (
                  <ListItem key={navItem.name} disablePadding>
                    <ListItemButton {...buttonProps}>
                      <ListItemIcon>
                        <MenuIcon />
                      </ListItemIcon>
                      <ListItemText primary={navItem.name} />
                    </ListItemButton>
                  </ListItem>
                );
              })}
          </List>
          <Divider />
        </Box>
      </Drawer>

    </div>
  );
}
