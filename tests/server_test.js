/**
 * SERVER_TEST.JS
 * AUTHOR: RAYMOND JOHN HILL
 */

'use strict'

let request = require('request')
let chai    = require('chai')

let server = require('../server')

let expect = chai.expect
let should = chai.should();

let chaiHttp = require('chai-http')
chai.use(chaiHttp)

describe('Testing server.js', () => {
    describe('GET /status', () => {
        it('Should return a JSON object with property \'status\' value LIVE', (done) => {
            chai.request(server)
                .get('/status')
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.be.an('object')
                    res.body.should.have.property('status')
                    res.body.status.should.be.a('string')
                    res.body.status.should.eql('LIVE')
                    res.headers.should.have.property('content-type', 'application/json; charset=utf-8')
                    done()
                })
        })
    })

    describe('GET /version', () => {
        it('Should return a JSON object with property \'version\' value #.#.#', (done) => {
            chai.request(server)
                .get('/version')
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.be.an('object')
                    res.body.should.have.property('version')
                    res.body.version.should.be.a('string')
                    res.body.version.should.match(/(\d+\.\d+\.\d+)/ig)
                    res.headers.should.have.property('content-type', 'application/json; charset=utf-8')
                    done()
                })
        })
    })

    describe('GET /info', () => {
        it('Should return an HTML page with title \'Info Page\'', (done) => {
            chai.request(server)
                .get('/info')
                .end((err, res) => {
                    res.should.have.status(200)
                    res.text.should.be.a('string')
                    res.text.should.have.string('<title>Info Page</title>')
                    res.headers.should.have.property('content-type').eql('text/html; charset=UTF-8')
                    done()
                })
        })
    })
})
