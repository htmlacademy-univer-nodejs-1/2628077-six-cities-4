export const Component = {
  App: Symbol.for('App'),
  Logger: Symbol.for('Logger'),
  DB: Symbol.for('DB'),
  UserService: Symbol.for('UserService'),
  OfferService: Symbol.for('OfferService'),
  UserModel: Symbol.for('UserModel'),
  OfferModel: Symbol.for('OfferModel'),
  CommentModel: Symbol.for('CommentModel'),
  CommentService: Symbol.for('CommentService'),
  UserController: Symbol.for('UserController'),
  OfferController: Symbol.for('OfferController'),
  CommentController: Symbol.for('CommentController'),
  ExceptionFilter: Symbol.for('ExceptionFilter'),
} as const;

