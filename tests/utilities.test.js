/*
This file is licensed under the Creative Commons Attribution-NonCommercial 4.0 International License.
You may obtain a copy of the license at https://creativecommons.org/licenses/by-nc/4.0/legalcode.txt
*/

require('../public/scripts/utilities')

describe('Check success execution when promise time out is lower than limit time out', () => {
    const properties = [
        { promiseTimeOut: 200, limitTimeOut: 300 },
        { promiseTimeOut: 270, limitTimeOut: 300 },
        { promiseTimeOut: 299, limitTimeOut: 300 },
        { promiseTimeOut: 300, limitTimeOut: 300 }
    ]

    properties.forEach((prop) => {
        test(`given a promise solved in ${prop.promiseTimeOut}ms and msTimeout of ${prop.limitTimeOut}ms should calls resolve function`, async () => {
            const resolve = jest.fn()
            const promise = new Promise((resolve) => setTimeout(() => resolve(), prop.promiseTimeOut))
            await execPromiseIn(promise, prop.limitTimeOut).then(resolve)

            expect(resolve).toHaveBeenCalled()
        })

        test(`given a promise solved in ${prop.promiseTimeOut}ms and msTimeout of ${prop.limitTimeOut}ms shouldn't calls reject function`, async () => {
            const reject = jest.fn()
            const promise = new Promise((resolve) => setTimeout(() => resolve(), prop.promiseTimeOut))
            await execPromiseIn(promise, prop.limitTimeOut).catch(reject)

            expect(reject).not.toHaveBeenCalled()
        })
    })
})

describe('Check fail execution when promise time out is greather than limit time out', () => {
    const properties = [
        { promiseTimeOut: 301, limitTimeOut: 300 },
        { promiseTimeOut: 340, limitTimeOut: 300 },
        { promiseTimeOut: 389, limitTimeOut: 300 }
    ]

    properties.forEach((prop) => {
        test(`given a promise solved in ${prop.promiseTimeOut}ms and msTimeout of ${prop.limitTimeOut}ms should calls reject function`, async () => {
            const reject = jest.fn()
            const promise = new Promise((resolve) => setTimeout(() => resolve('response'), prop.promiseTimeOut))

            await execPromiseIn(promise, prop.limitTimeOut).catch(reject)

            expect(reject).toHaveBeenCalled()
        })

        test(`given a promise solved in ${prop.promiseTimeOut}ms and msTimeout of ${prop.limitTimeOut}ms shouldn't calls resolve function`, async () => {
            const resolve = jest.fn()
            const promise = new Promise((resolve) => setTimeout(() => resolve('response'), prop.promiseTimeOut))

            try {
                await execPromiseIn(promise, prop.limitTimeOut).then(resolve)
            } catch (_) {
            }

            expect(resolve).not.toHaveBeenCalled()
        })
    })
})
