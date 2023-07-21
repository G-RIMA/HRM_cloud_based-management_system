// passport-config.js
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const Employee = require('./models/Employee');
const Hr = require('./models/Hr');
const Director = require('./models/Director');

passport.use(
  'employee',
  new LocalStrategy(
    { usernameField: 'email' },
    async (email, password, done) => {
      try {
        const user = await Employee.findOne({ where: { email } });
        if (!user) {
          return done(null, false, { message: 'Employee not found.' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
          return done(null, false, { message: 'Invalid password.' });
        }

        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);

passport.use(
  'hr',
  new LocalStrategy(
    { usernameField: 'email' },
    async (email, password, done) => {
      try {
        const user = await Hr.findOne({ where: { email } });
        if (!user) {
          return done(null, false, { message: 'HR not found.' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
          return done(null, false, { message: 'Invalid password.' });
        }

        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);

passport.use(
  'director',
  new LocalStrategy(
    { usernameField: 'email' },
    async (email, password, done) => {
      try {
        const user = await Director.findOne({ where: { email } });
        if (!user) {
          return done(null, false, { message: 'Director not found.' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
          return done(null, false, { message: 'Invalid password.' });
        }

        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, { id: user.id, userType: user.constructor.name });
});

passport.deserializeUser(async (user, done) => {
  try {
    switch (user.userType) {
      case 'Employee':
        const employee = await Employee.findByPk(user.id);
        done(null, employee);
        break;
      case 'Hr':
        const hr = await Hr.findByPk(user.id);
        done(null, hr);
        break;
      case 'Director':
        const director = await Director.findByPk(user.id);
        done(null, director);
        break;
      default:
        done(new Error('Unknown user type'));
    }
  } catch (err) {
    done(err);
  }
});
