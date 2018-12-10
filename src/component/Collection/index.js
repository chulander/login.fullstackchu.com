import React from 'react';
import { Button, Card, Container, Header, Image } from 'semantic-ui-react';
import logo from '../../resource/logo.png';
import batmanProfile from '../../resource/batman_profile.png';
import jokerProfile from '../../resource/joker_profile.png';
import AuthService from '../AuthService';

const Auth = new AuthService();
const redirectDomain = e => {
  e.preventDefault();
  console.log('what is e', e.target.name);
  const { name: domainName } = e.target;
  const token = Auth.getToken();

  window.location.replace(
    `https://${domainName}.fullstackchu.com?id_token=${token}`
  );
};
const CardExampleGroups = () => (
  <Container>
    <Header as="h2" icon textAlign="center">
      <Image centered size="large" src={logo} />
      {/* <Icon name="users" circular /> */}
      <Header.Content>Which path will you choose?</Header.Content>
    </Header>
    <Card.Group centered>
      <Card>
        <Card.Content>
          <Image floated="right" size="mini" src={batmanProfile} />
          <Card.Header>Batman</Card.Header>
          <Card.Meta>Does Justice Ever Sleep?</Card.Meta>
        </Card.Content>
        <Card.Content extra>
          <div className="ui two buttons">
            <Button basic color="green" name="batman" onClick={redirectDomain}>
              Justice!
            </Button>
          </div>
        </Card.Content>
      </Card>
      <Card>
        <Card.Content>
          <Image floated="right" size="mini" src={jokerProfile} />
          <Card.Header>Joker</Card.Header>
          <Card.Meta>The Joke's On You</Card.Meta>
        </Card.Content>
        <Card.Content extra>
          <div className="ui two buttons">
            <Button basic color="green" name="joker" onClick={redirectDomain}>
              The Joke
            </Button>
          </div>
        </Card.Content>
      </Card>
    </Card.Group>
  </Container>
);

export default CardExampleGroups;
