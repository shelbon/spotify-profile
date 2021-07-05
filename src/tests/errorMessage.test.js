/**
 * @jest-environment jsdom
 */
import { render } from '@testing-library/svelte';
import QueryErrorMessage from '../components/QueryErrorMessage.svelte';

describe('errorMessage component ', () => {
  let data;
  beforeEach(() => {
    data = new Set();
  });
  test('should render component correctly', () => {
    data.add({
      error: {
        status: 401,
        message: 'no token provided',
        detail:
          "An authentication error occurred while communicating with Spotify's Web API.",
      },
    });
    data.add({
      error: {
        status: 401,
        message: 'no token provided',
        detail:
          "An authentication error occurred while communicating with Spotify's Web API.",
      },
    });

    const { container } = render(QueryErrorMessage, {
      props: {
        data,
      },
    });

    expect(container).toContainHTML(
      '<body><div><div class="error-query-container"><strong>An authentication error occurred while communicating with Spotify\'s Web API.</strong></div></div></body>',
    );
  });
  it('should render default text if  data passed is empty', () => {
    const { container } = render(QueryErrorMessage, {
      props: {
        data: '',
      },
    });

    expect(container).toContainHTML(
      '<body><div><div class="error-query-container"><strong>Sorry ,an unknow error happend please retry or contact technical service at xxxx@xxx.fr</strong></div></div></body>',
    );
  });
  describe("should show message  either when   it's a error object or not", () => {
    it('when it is a error object', () => {
      data.add({
        error: {
          status: 401,
          message: 'no token provided',
          detail:
            "An authentication error occurred while communicating with Spotify's Web API.",
        },
      });
      const { container } = render(QueryErrorMessage, {
        props: {
          data,
        },
      });

      expect(container).toContainHTML(
        '<body><div><div class="error-query-container"><strong>An authentication error occurred while communicating with Spotify\'s Web API.</strong></div></div></body>',
      );
    });

    it('when it is not a  error object', () => {
      data.add({
        error: 'invalid_client',
        error_description: 'Invalid client secret',
      });
      const { container } = render(QueryErrorMessage, {
        props: {
          data,
        },
      });

      expect(container).toContainHTML(
        '<body><div><div class="error-query-container"><strong>Invalid client secret</strong></div></div></body>',
      );
    });
  });

  it('should show message of  critical error(status code 401,500,501,503)', () => {
    data.add({
      error: {
        status: 429,
        detail: 'too many request sent please retry in xxx seconds',
      },
    });

    data.add({
      error: {
        status: 401,
        message: 'no token provided',
        detail:
          "An authentication error occurred while communicating with Spotify's Web API.",
      },
    });

    const { container } = render(QueryErrorMessage, {
      props: {
        data,
      },
    });

    expect(container).toContainHTML(
      '<body><div><div class="error-query-container"><strong>too many request sent please retry in xxx seconds</strong></div></div></body>',
    );
  });
  it('should show message of  status code 500  if other critical error are present ', () => {
    data.add({
      error: {
        status: 503,
        detail:
          'The server is currently unable to handle the request due to a temporary condition which will be alleviated after some delay. You can choose to resend the request again.',
      },
    });
    data.add({
      error: {
        status: 500,
        message: 'Internal Server Error',
        detail: 'Internal Server Error',
      },
    });

    data.add({
      error: {
        status: 401,
        message: 'no token provided',
        detail:
          "An authentication error occurred while communicating with Spotify's Web API.",
      },
    });

    const { container } = render(QueryErrorMessage, {
      props: {
        data,
      },
    });

    expect(container).toContainHTML(
      '<body><div><div class="error-query-container"><strong>Internal Server Error</strong></div></div></body>',
    );
  });
});
