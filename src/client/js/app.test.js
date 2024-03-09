const { addTrip } = require('./app');

describe('addTrip function', () => {
  const fetchMock = jest.fn(() => Promise.resolve({ status: 200 }));
  const form = {
    addEventListener: jest.fn((event, callback) => {
      if (event === 'submit') callback({ preventDefault: jest.fn() });
    }),
    reset: jest.fn(),
  };
  const leavingFrom = { value: 'Departure City' };
  const goingTo = { value: 'Arrival City' };
  const depDate = { value: '2024-03-09' };

  beforeAll(async () => {
    global.fetch = fetchMock;
    await addTrip.call({ form, leavingFrom, goingTo, depDate });
  });

  test('It should call the necessary functions', () => {
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  test('It should return a response with status 200', async () => {
    const response = await fetchMock();
    expect(response.status).toEqual(200);
  });
});