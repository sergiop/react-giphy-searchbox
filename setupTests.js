/* eslint-disable import/no-extraneous-dependencies */
import 'babel-polyfill'

const enzyme = require('enzyme')
const Adapter = require('enzyme-adapter-react-16')

// Setup enzyme's react adapter
enzyme.configure({
  adapter: new Adapter(),
})
