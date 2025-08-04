import {prismaClient} from "../src"
const USER_ID = "9"

async function seed() {
    await prismaClient.user.create({
        data: {
            id: USER_ID,
            email: "test@test.cwebsiteTick"
        }
    })

    const website = await prismaClient.website.create({
        data: {
            url: "https://test.com",
            userId: USER_ID
        }
    })

    const validator = await prismaClient.validator.create({
        data: {
            publicKey: "0x9168363785178",
            location: "Delhi",
            ip: "127.0.0.1",
        }
    })

    await prismaClient.websiteTick.create({
        data: {
            websiteId: website.id,
            status: "Good",
            createdAt: new Date(),
            latency: 100,
            validatorId: validator.id
        }
    })

    await prismaClient.websiteTick.create({
        data: {
            websiteId: website.id,
            status: "Good",
            createdAt: new Date(Date.now() - 10 * 60 * 1000),
            latency: 100,
            validatorId: validator.id
        }
    })

    await prismaClient.websiteTick.create({
        data: {
            websiteId: website.id,
            status: "Bad",
            createdAt: new Date(Date.now() - 20 * 60 * 1000),
            latency: 100,
            validatorId: validator.id
        }
    })
}

seed()