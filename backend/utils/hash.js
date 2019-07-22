const crypto = require('crypto')

// Set hash vars
const config = {
  hashSize: 128,
  saltSize: 32,
  iterations: 242816
}

// Hash string
const hash = (password, callback) => {

  // Create salt
  const hash = crypto.randomBytes(
    config.saltSize,
    (err, salt) => {
      if (err) throw err

      // Hash string with salt and vars
      crypto.pbkdf2(
        password,
        salt.toString('hex'),
        config.iterations,
        config.hashSize,
        'sha512',
        (err, hash) => {
          if (err) throw err

          // Combine results and hash vars to a single string
          const comb = [
            hash.toString('hex').length,
            salt.toString('hex').length,
            config.iterations,
            config.hashSize,
            hash.toString('hex'),
            salt.toString('hex')
          ].join('')

          // Respond with combination
          callback(comb)
        }
      )
    }
  )
  return hash
}

// Verify password
const verify = (password, hashAll, callback) => {
  // Open combination of hash
  let i = 0
  const hashlen = parseInt(hashAll.substring(i, i += 3))
  const saltlen = parseInt(hashAll.substring(i, i += 2))
  const iterations = parseInt(hashAll.substring(i, i += 6))
  const hashSize = parseInt(hashAll.substring(i, i += 3))
  const hash = hashAll.substring(i, i += hashlen)
  const salt = hashAll.substring(i, i += saltlen)

  // verify the salt and hash against the password
  return crypto.pbkdf2(
    password,
    salt,
    iterations,
    hashSize,
    'sha512',
    (err, verify) => {
      if (err) throw err

      // If hash === pass
      callback(verify.toString('hex') === hash)
    }
  )
}

// Generate 20 random chars
const TWENTY = crypto.randomBytes(20).toString('hex')

module.exports = {
  hash,
  verify,
  TWENTY
} 