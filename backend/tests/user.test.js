const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const dbconnect = require('../utils/dbconnect')

const User = require('../models/user')
const Hash = require('../utils/hash')

// Test objects
const userObj = {
  username: 'testing',
  password: 'testing',
  loginKEY: Hash.TWENTY,
}

Hash.hash(userObj.password, res => {
  userObj.password = res
})

/* ----------USER TESTS---------- */
describe('User tests', () => {

  beforeEach(async () => {
    await User.deleteMany({})
    
    let newUser = new User(userObj)
    await newUser.save()
  })

  test('user is returned as json', async () => {
    await api
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('user name is returned correctly', async () => {
    const users = await User.find({})
    const username = users.map(u => u.username)
    expect(username).toContain(userObj.username)
  })

  test('username can not be a duplicate', async () => {
    let newUser = new User(userObj)
    let err = null
    try {
      await newUser.save()
      err = 'no catch'
    } catch(ex) {
      err = 'catch'
    }
    expect(err).toBe('catch')
  })

  test('username can be edited', async () => {
    const newName = {
      username: 'testi'
    }
    const options = {
      context: 'query',
      runValidators: true,
      new: true,
      select: 'username email id  loginKEY'
    }

    const userArr = await User.find({username: userObj.username})
    const user = userArr[0]
    const newUser = await User.findByIdAndUpdate(user.id, newName, options)

    expect(newUser.username).toBe(newName.username)
  })

  test('Correct password is verified', async () => {
    const userArr = await User.find({username: userObj.username})
    const user = userArr[0]

    await Hash.verify('testing', user.password, res => expect(res).toEqual(true))
  })

  test('Wrong password fails', async () => {
    const userArr = await User.find({username: userObj.username})
    const user = userArr[0]

    await Hash.verify('wrongpassword', user.password, res => expect(res).toEqual(false))
  })

  test('user can be removed', async () => {
    const userArr = await User.find({username: userObj.username})
    const user = userArr[0]

    await User.findByIdAndRemove(user.id)

    const users = await User.find({})

    expect(users).toEqual([])
  })
})

afterAll(() => {
  dbconnect.usersDB.connection.close()
  dbconnect.recipesDB.connection.close()
})