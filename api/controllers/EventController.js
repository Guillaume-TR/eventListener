const Event = require('../models/Event');

class EventController {
  /**
   * Get all events
   * @param {object} request
   * @param {object} response
   */
  static getAll(request, response) {
    Event.getAll((result) => {
      response.json(result);
    });
  }

  /**
  * Find and get specific event
  * @param {object} request
  * @param {object} response
  */
  static getEvent(request, response) {
    const { eventId } = request.params;

    if (isNaN(eventId)) {
      response.status(200);
      response.json({
        status: 'Bad data received',
      });
    }
    else {
      Event.find(
        eventId,
        (result) => {
          if (result.rowMatch) {
            response.json({
              status: 'success',
              result,
            });
          }
          else {
            response.json({
              status: "Event doesn't exist",
            });
          }
        },
      );
    }
  }

  /**
   * Find and get Event by price
   * @param {object} request
   * @param {object} response
   */
  static getEventByPrice(request, response) {
    const { price } = request.params;

    if (isNaN(price)) {
      response.status(200);
      response.json({
        status: 'Bad data received',
      });
    }
    else {
      Event.findPrice(
        price,
        (result) => {
          if (result.rowMatch) {
            response.json({
              status: 'success',
              result,
            });
          }
          else {
            response.json({
              status: "Event doesn't exist",
            });
          }
        },
      );
    }
  }

  /**
   * Find and get Event by diffusion (live)
   * @param {object} request
   * @param {object} response
   */
  static getEventByDiffusion(request, response) {
    const { live } = request.params;

    if (isNaN(live)) {
      response.status(200);
      response.json({
        status: 'Bad data received',
      });
    }
    else {
      Event.findLive(
        live,
        (result) => {
          if (result.rowMatch) {
            response.json({
              status: 'success',
              result,
            });
          }
          else {
            response.json({
              status: "Event doesn't exist",
            });
          }
        },
      );
    }
  }

  /**
   * Find and get Event by localisation
   * @param {object} request
   * @param {object} response
   */
  static getEventByLocalisation(request, response) {
    const { loc } = request.params;

    Event.findLocalisation(
      loc,
      (result) => {
        if (result.rowMatch) {
          response.json({
            status: 'success',
            result,
          });
        }
        else {
          response.json({
            status: "Event doesn't exist",
          });
        }
      },
    );
  }

  /**
   * Find and get Event by tags
   * @param {object} request
   * @param {object} response
   */
  static getEventByTags(request, response) {
    const { tag } = request.params;

    Event.findTags(
      tag,
      (result) => {
        if (result.rowMatch) {
          response.json({
            status: 'success',
            result,
          });
        }
        else {
          response.json({
            status: "Event doesn't exist",
          });
        }
      },
    );
  }

  /**
   * Find and get Event by Title
   * @param {object} request
   * @param {object} response
   */
  static getEventByTitle(request, response) {
    const { name } = request.params;

    Event.findTitle(
      name,
      (result) => {
        if (result.rowMatch) {
          response.json({
            status: 'success',
            result,
          });
        }
        else {
          response.json({
            status: "Event doesn't exist",
          });
        }
      },
    );
  }

  /**
   * Find and get Event by Starting Date
   * @param {object} request
   * @param {object} response
   */
  static getEventByStartingDate(request, response) {
    const { start } = request.params;

    Event.findStart(
      start,
      (result) => {
        if (result.rowMatch) {
          response.json({
            status: 'success',
            result,
          });
        }
        else {
          response.json({
            status: "Event doesn't exist",
          });
        }
      },
    );
  }

  /**
   * Find and get Event by Ending Date
   * @param {object} request
   * @param {object} response
   */
  static getEventByEndingDate(request, response) {
    const { finish } = request.params;

    Event.findFinish(
      finish,
      (result) => {
        if (result.rowMatch) {
          response.json({
            status: 'success',
            result,
          });
        }
        else {
          response.json({
            status: "Event doesn't exist",
          });
        }
      },
    );
  }

  /**
   * Find and get Event by Date
   * @param {object} request
   * @param {object} response
   */
  static getEventByDate(request, response) {
    const { start, finish } = request.params;

    Event.findDate(
      start,
      finish,
      (result) => {
        if (result.rowMatch) {
          response.json({
            status: 'success',
            result,
          });
        }
        else {
          response.json({
            status: "Event doesn't exist",
          });
        }
      },
    );
  }

  /**
   * Sort events by start_date and reduce to x results
   * @param {object} request
   * @param {object} response
   */
  static getNextEvents(request, response) {
    const { number } = request.params;

    if (isNaN(number)) {
      response.status(200);
      response.json({
        status: 'Not a number',
      });
    }
    else {
      Event.sortByStartDate(
        number,
        (result) => {
          if (result.rowMatch) {
            response.json({
              status: 'success',
              result,
            });
          }
          else {
            response.json({
              status: "Event doesn't exist",
            });
          }
        },
      );
    }
  }

  /**
   * Get all events
   * @param {object} request
   * @param {object} response
   */
  static getEventByFilter(request, response) {
    const filters = request.body;
    Event.findFilter(filters, (result) => {
      response.json(result);
    });
  }

  /**
  * Get one event in progress
  * @param {object} request
  * @param {object} response
  */
  static getEventInProgress(request, response) {
    Event.getEventInProgress((result) => {
      response.json(result);
    });
  }
}


module.exports = EventController;
