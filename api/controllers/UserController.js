// Dependances
const bcrypt = require('bcrypt');
const jwToken = require('jsonwebtoken');

// Models
const User = require('../models/User');
const Event = require('../models/Event');

// Utils functions
const checkEmail = require('../utils/functions').checkEmail;

class UserController {

  /**
   * Check authentication
   * @param {object} request
   * @param {object} response
   */
  static checkAuth(request, response) {
    
    if (request.headers.authorization) {
      const token = request.headers.authorization.split(' ')[1];

      jwToken.verify(
        token,
        process.env.APP_KEY,
        (error, decode) => {
          if (error) {

            response.status(401).send({ 
              error: true,
              errorMessage: 'Erreur d\'authentification.',
            });
          } else {

            User.find(
              decode.userId,
              (result) => {
      
                if (result.rowMatch) {
                  
                  response.status(200).json(result);
                } else {
      
                  response.status(401).json({
                    error: true,
                    errorMessage: 'Erreur d\'authentification.',
                  });
                }
              });
          }
        });

    } else {
      
      response.status(401).send({ 
        error: true,
        errorMessage: 'Token manquant.',
      });
    }
  }

  /**
   * Create an account
   * @param {object} request
   * @param {object} response
   */
  static add(request, response) {
    const data = request.body.data;

    let errors = [];

    // check if all fields are correct
    if (!(data.pseudo && data.email &&
          data.password && data.confirmPassword &&
          (typeof data.notifNewEvent === 'boolean') &&
          (typeof data.notifNewUpdate === 'boolean'))) {

      errors.push('Tous les champs ne sont pas remplis');
    } else {

      if (!(checkEmail(data.email))) {
        errors.push('L\'adresse email n\'est pas correcte');
      }

      if (data.pseudo.trim().length < 4) {
        errors.push('Le pseudo doit contenir au minimum 4 caractères');
      }

      if (data.password.trim().length < 6) {
        errors.push('Le mot de passe doit contenir au minimum 6 caractères');
      }
      if (data.password.trim() !== data.confirmPassword.trim()) {
        errors.push('Les mots de passe ne correspondent pas');
      }
    }

    if (errors.length < 1) {
      
      User.checkUserByEmail(data.email, (result) => {
        // Check if user doesn't exist
        if (!result.rowMatch) {
  
          // Hash the password (use dep bcrypt)
          data.password = bcrypt.hashSync(data.password, 10);
          
          User.create(
            data,
            (result) => {
  
            response.status(201).json(result);
          });
        } else {
  
          errors.push('Cet email est déjà utilisé');
        
          response.status(200).json({
            error: true,
            errorMessages: errors,
          });
        }
      });
    } else {
  
      response.status(200).json({
        error: true,
        errorMessages: errors,
      });
    }
  }
  /**
   * Connection
   * @param {object} request
   * @param {object} response
   */
  static connect(request, response) {
    const data = request.body.data;

    let errors = [];
    if (!(data.email && (data.email.length > 0) && data.password && (data.password.length > 0))) {
      errors.push('Tous les champs ne sont pas remplis')
    }

    if (errors < 1) {
      
      User.checkUserByEmail(
        data.email,
        (result) => {
  
        if (result.rowMatch) {
          const { password: hashedPassword } = result.data;
          const checkPassword = bcrypt.compareSync(data.password, hashedPassword);
          
          if (checkPassword) {
            let expire = '12h';
            if (data.stayLoggedIn) {
              expire = '7d';
            }
            const token = jwToken.sign(
              { userId: result.data.id }, 
              process.env.APP_KEY,
              { expiresIn: expire });
              
              User.find(
                result.data.id,
                (result) => {

                  response.status(200).json({
                    error: false,
                    result,
                    token,
                  });
                }
              );
          } else {
  
            response.status(200).json({
              error: true,
              errorMessage: "Le mot de passe ou l'email est incorrect",
            });
          }
        } else {
  
          response.status(200).json({
            error: true,
            errorMessage: "Le mot de passe ou l'email est incorrect",
          });
        }
      });
    } else {

      response.status(200).json({
        error: true,
        errorMessage: errors,
      });
    }
  }

  /**
   * Disconnect
   * @param {object} request
   * @param {object} response
   */
  static disconnect(request, response) {

    response.status(200).json({
      error: false,
      successMessage: 'Déconnexion réussie',
    })
  }

  /**
   * Find and get specific user
   * @param {object} request
   * @param {object} response
   */
  static getUser(request, response) {
    const { userId } = request.params;

    if (isNaN(userId)) {

      response.status(200);
      response.json({
        status: "Bad data received"
      });
    } else {
      
      User.find(
        userId,
        (result) => {

          response.status(200);
          if (result.rowMatch) {
            
            response.json({
              status: "Success",
              result,
            });
          } else {

            response.json({
              status: "User not found",
              result,
            });
          }
        });
    }
  }

  /**
   * Delete specific user
   * @param {object} request
   * @param {object} response
   */
   static deleteAccount(request, response) {
    const { userId } = request.params;

    let errors = [];

    if (isNaN(userId)) {

      response.status(404).json({
        error: true,
        errorMessage: 'Erreur de requête',
      });
    } else {
      
      let token;
      if (request.body.headers && request.body.headers.Authorization) {
        token = request.body.headers.Authorization.split(' ')[1];
      } else {
        errors.push('Vous n\'êtes pas autorisé à effectuer cette action');
      }

      if (errors < 1) {

        jwToken.verify(
          token,
          process.env.APP_KEY,
  
          (error, decode) => {
            if (error) {
              response.status(401).json({
                error: true,
                errorMessage: 'Une erreur interne s\'est produite',
              });
            } else {
              if (decode.userId === Number(userId)) {

                User.delete(
                  userId,
                  (result) => {
          
                    if (result.rowMatch) {
                      response.status(200).json({
                        error: false,
                        successMessage: 'Votre compte a bien été supprimé du site',
                      });
                    } else {
                      
                      response.status(404).json({
                        error: true,
                        errorMessage: 'Cet utilisateur n\'existe pas',
                        result,
                      });
                    }
                  });
              } else {

                response.status(401).json({
                  error: true,
                  errorMessage: 'Vous n\'êtes pas autorisé à effectuer cette action',
                });
              }
            }
          });
      }
    }
  }

  /**
   * Update specific user
   * @param {object} request
   * @param {object} response
   */
  static updateAccount(request, response) {
    const data = request.body.data;
    const { userId } = request.params;

    let error;

    // check if all fields are correct
    if (!(data.fistname && data.fistname.trim().length < 1) &&
        !(data.lastname && data.lastname.trim().length < 1) &&
        !(data.email && data.email.trim().length < 1) &&
        !(typeof data.notifNewEvent === 'boolean') &&
        !(typeof data.notifNewUpdate === 'boolean')) {

      error = 'Tous les champs ne sont pas remplis';
    } else {

      if (!(checkEmail(data.email))) {
        error = 'L\'adresse email n\'est pas correcte';
      }
    }

    let editPassword = false;
    
    if ((data.password)) {
      if (data.password.trim().length > 5) {
        
        if ((data.confirmPassword && (data.password === data.confirmPassword))) {
          // Hash the password (use dep bcrypt)
          data.password = bcrypt.hashSync(data.password, 10);
          editPassword = true;
        } else {
          error = 'Les mots de passe ne correspondent pas';
        }
      } else {
        error = 'Le mot de passe doit contenir au moins 6 caractères';
      }
    }

    let token;
    if (request.body.headers && request.body.headers.Authorization) {
      token = request.body.headers.Authorization.split(' ')[1];
    } else {
      error = 'Vous n\'êtes pas autorisé à effectuer cette action';
    }

    if (!error) {

      jwToken.verify(
        token,
        process.env.APP_KEY,
        (error, decode) => {

          if (error) {
            response.status(401).json({
              error: true,
              errorMessage: 'Vous n\'êtes pas autorisé à effectuer cette action',
            });
          } else {

            if (decode.userId === Number(userId)) {

              User.update(
                data,
                userId,
                editPassword,
                (result) => {
                  
                  response.status(200);
                  response.json({
                    error: false,
                    successMessage: 'Vos informations ont bien été modifiées',
                  });
                });
            } else {

              response.status(401).json({
                error: true,
                errorMessage: 'Vous n\'êtes pas autorisé à effectuer cette action',
              });
            }
          }

        }
      )
    } else {
      response.status(200).json({
        error: true,
        errorMessage: error,
      })
    }
  }

  /**
   * User adds a like to the event
   * @param {object} request
   * @param {object} response
   */
  static addLikeToEvent(request,response) {
    const { userId, eventId } = request.params;
    
    let errors = [];
    let token;
    if (request.body.headers && request.body.headers.Authorization) {
      token = request.body.headers.Authorization.split(' ')[1];
    } else {
      errors.push('Vous n\'êtes pas autorisé à effectuer cette action');
    }

    if (errors.length < 1) {

      Event.find(
        eventId,
        (result) => {
          if (result.rowMatch) {

            jwToken.verify(
              token,
              process.env.APP_KEY,
      
              (error, decode) => {

                if (error) {
                  response.status(401).json({
                    error: true,
                    errorMessage: 'Vous n\'êtes pas autorisé à effectuer cette action',
                  });
                } else {
                  if (decode.userId === Number(userId)) {

                    User.addLikeToEvent(
                      userId,
                      eventId,
                      (result) => {
                        
                        if (!result.error) {

                          response.status(201).json({
                            error: false,
                            successMessage: 'Action effectuée',
                          });
                        } else {
                          response.status(404).json({
                            error: true,
                            errorMessage: 'Un problème interne s\'est produit',
                          });
                        }
                      });
                  } else {
                    response.status(401).json({
                      error: true,
                      errorMessage: 'Vous n\'êtes pas autorisé à effectuer cette action',
                    });
                  }
                }
      
              });
          } else {
            response.status(404).json({
              error: true,
              errorMessage: 'L\'événement n\'existe pas ou plus',
            })
          }
        });
    } else {
      response.status(401).json({
        error: true,
        errorMessage: errors,
      })
    }
  }

  /**
   * User delete a like to the event
   * @param {object} request
   * @param {object} response
   */
  static deleteLikeToEvent(request,response) {
    const { userId, eventId } = request.params;
    
    let errors = [];

    let token;
    if (request.body.headers && request.body.headers.Authorization) {
      token = request.body.headers.Authorization.split(' ')[1];
    } else {
      errors.push('Vous n\'êtes pas autorisé à effectuer cette action');
    }

    if (errors.length < 1) {

      Event.find(
        eventId,
        (result) => {
          if (result.rowMatch) {

            jwToken.verify(
              token,
              process.env.APP_KEY,
      
              (error, decode) => {

                if (error) {
                  response.status(401).json({
                    error: true,
                    errorMessage: 'Vous n\'êtes pas autorisé à effectuer cette action',
                  });
                } else {
                  if (decode.userId === Number(userId)) {

                    User.deleteLikeToEvent(
                      userId,
                      eventId,
                      (result) => {
                        
                        if (!result.error) {

                          response.status(200).json({
                            error: false,
                            successMessage: 'Action effectuée',
                          });
                        } else {
                          response.status(404).json({
                            error: true,
                            errorMessage: 'Un problème interne s\'est produit',
                          });
                        }
                      });
                  } else {
                    response.status(401).json({
                      error: true,
                      errorMessage: 'Vous n\'êtes pas autorisé à effectuer cette action',
                    });
                  }
                }
      
              });
          } else {
            response.status(404).json({
              error: true,
              errorMessage: 'L\'événement n\'existe pas ou plus',
            })
          }
        });
    } else {
      response.status(401).json({
        error: true,
        errorMessage: errors,
      })
    }
  }

  /**
   * User adds his interest for the event
   * @param {object} request
   * @param {object} response
   */
  static addInterestToEvent(request,response) {
    const { userId, eventId } = request.params;
    
    let errors = [];

    let token;
    if (request.body.headers && request.body.headers.Authorization) {
      token = request.body.headers.Authorization.split(' ')[1];
    } else {
      errors.push('Vous n\'êtes pas autorisé à effectuer cette action');
    }

    if (errors.length < 1) {

      Event.find(
        eventId,
        (result) => {
          if (result.rowMatch) {

            jwToken.verify(
              token,
              process.env.APP_KEY,
      
              (error, decode) => {

                if (error) {
                  response.status(401).json({
                    error: true,
                    errorMessage: 'Vous n\'êtes pas autorisé à effectuer cette action',
                  });
                } else {
                  if (decode.userId === Number(userId)) {

                    User.addInterestToEvent(
                      userId,
                      eventId,
                      (result) => {
                        
                        if (!result.error) {

                          response.status(201).json({
                            error: false,
                            successMessage: 'Action effectuée',
                          });
                        } else {
                          response.status(404).json({
                            error: true,
                            errorMessage: 'Un problème interne s\'est produit',
                          });
                        }
                      });
                  } else {
                    response.status(401).json({
                      error: true,
                      errorMessage: 'Vous n\'êtes pas autorisé à effectuer cette action',
                    });
                  }
                }
      
              });
          } else {
            response.status(404).json({
              error: true,
              errorMessage: 'L\'événement n\'existe pas ou plus',
            })
          }
        });
    } else {
      response.status(401).json({
        error: true,
        errorMessage: errors,
      })
    }
  }

  /**
   * User delete is interest for the event
   * @param {object} request
   * @param {object} response
   */
  static deleteInterestToEvent(request,response) {
    const { userId, eventId } = request.params;
    
    let errors = [];

    let token;
    if (request.body.headers && request.body.headers.Authorization) {
      token = request.body.headers.Authorization.split(' ')[1];
    } else {
      errors.push('Vous n\'êtes pas autorisé à effectuer cette action');
    }

    if (errors.length < 1) {

      Event.find(
        eventId,
        (result) => {
          if (result.rowMatch) {

            jwToken.verify(
              token,
              process.env.APP_KEY,
      
              (error, decode) => {

                if (error) {
                  response.status(401).json({
                    error: true,
                    errorMessage: 'Vous n\'êtes pas autorisé à effectuer cette action',
                  });
                } else {
                  if (decode.userId === Number(userId)) {

                    User.deleteInterestToEvent(
                      userId,
                      eventId,
                      (result) => {
                        
                        if (!result.error) {

                          response.status(200).json({
                            error: false,
                            successMessage: 'Action effectuée',
                          });
                        } else {
                          response.status(404).json({
                            error: true,
                            errorMessage: 'Un problème interne s\'est produit',
                          });
                        }
                      });
                  } else {
                    response.status(401).json({
                      error: true,
                      errorMessage: 'Vous n\'êtes pas autorisé à effectuer cette action',
                    });
                  }
                }
      
              });
          } else {
            response.status(404).json({
              error: true,
              errorMessage: 'L\'événement n\'existe pas ou plus',
            })
          }
        });
    } else {
      response.status(200).json({
        error: true,
        errorMessage: errors,
      })
    }
  }

  /**
   * User adds his participation to the event
   * @param {object} request
   * @param {object} response
   */
  static addParticipationToEvent(request,response) {
    const { userId, eventId } = request.params;
    
    let errors = [];

    let token;
    if (request.body.headers && request.body.headers.Authorization) {
      token = request.body.headers.Authorization.split(' ')[1];
    } else {
      errors.push('Vous n\'êtes pas autorisé à effectuer cette action');
    }

    if (errors.length < 1) {

      Event.find(
        eventId,
        (result) => {
          if (result.rowMatch) {

            jwToken.verify(
              token,
              process.env.APP_KEY,
      
              (error, decode) => {

                if (error) {
                  response.status(401).json({
                    error: true,
                    errorMessage: 'Vous n\'êtes pas autorisé à effectuer cette action',
                  });
                } else {
                  if (decode.userId === Number(userId)) {

                    User.addParticipationToEvent(
                      userId,
                      eventId,
                      (result) => {
                        
                        if (!result.error) {

                          response.status(201).json({
                            error: false,
                            successMessage: 'Action effectuée',
                          });
                        } else {
                          response.status(404).json({
                            error: true,
                            errorMessage: 'Un problème interne s\'est produit',
                          });
                        }
                      });
                  } else {
                    response.status(401).json({
                      error: true,
                      errorMessage: 'Vous n\'êtes pas autorisé à effectuer cette action',
                    });
                  }
                }
      
              });
          } else {
            response.status(404).json({
              error: true,
              errorMessage: 'L\'événement n\'existe pas ou plus',
            })
          }
        });
    } else {
      response.status(401).json({
        error: true,
        errorMessage: errors,
      })
    }
  }

  /**
   * User delete is participation to the event
   * @param {object} request
   * @param {object} response
   */
  static deleteParticipationToEvent(request,response) {
    const { userId, eventId } = request.params;
    
    let errors = [];

    let token;
    if (request.body.headers && request.body.headers.Authorization) {
      token = request.body.headers.Authorization.split(' ')[1];
    } else {
      errors.push('Vous n\'êtes pas autorisé à effectuer cette action');
    }

    if (errors.length < 1) {

      Event.find(
        eventId,
        (result) => {
          if (result.rowMatch) {

            jwToken.verify(
              token,
              process.env.APP_KEY,
      
              (error, decode) => {

                if (error) {
                  response.status(401).json({
                    error: true,
                    errorMessage: 'Vous n\'êtes pas autorisé à effectuer cette action',
                  });
                } else {
                  if (decode.userId === Number(userId)) {

                    User.deleteParticipationToEvent(
                      userId,
                      eventId,
                      (result) => {
                        
                        if (!result.error) {

                          response.status(200).json({
                            error: false,
                            successMessage: 'Action effectuée',
                          });
                        } else {
                          response.status(404).json({
                            error: true,
                            errorMessage: 'Un problème interne s\'est produit',
                          });
                        }
                      });
                  } else {
                    response.status(401).json({
                      error: true,
                      errorMessage: 'Vous n\'êtes pas autorisé à effectuer cette action',
                    });
                  }
                }
      
              });
          } else {
            response.status(404).json({
              error: true,
              errorMessage: 'L\'événement n\'existe pas ou plus',
            })
          }
        });
    } else {
      response.status(200).json({
        error: true,
        errorMessage: errors,
      })
    }
  }
};

module.exports = UserController;
