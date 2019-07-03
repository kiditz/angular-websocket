import { AngularWebsocketPage } from './app.po';

describe('angular-websocket App', () => {
  let page: AngularWebsocketPage;

  beforeEach(() => {
    page = new AngularWebsocketPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
