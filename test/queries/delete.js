const { entity, field } = require("gotu")
const Repository = require("../../src/repository")
const assert = require("assert")

describe("Delete an Entity", () => {
  const givenAnEntity = () => {
    return entity("An entity", {
      id: field(Number),
      stringTest: field(String),
      booleanTest: field(Boolean),
    })
  }

  const givenAnRepositoryClass = (options) => {
    return class ItemRepositoryBase extends Repository {
      constructor(options) {
        super(options)
      }
    }
  }

  const knex = () => {
    return { withSchema: () => { return {from: ()=> { return { where: (columns) => ({ delete: (columns) => 1 })}} }} } 
  }

  it("should delete an entity", async () => {
    //given
    const anEntity = givenAnEntity()
    const injection = { knex }
    const ItemRepository = givenAnRepositoryClass()
    const itemRepo = new ItemRepository({
      entity: anEntity,
      table: "aTable",
      ids: ["id"],
      dbConfig: {},
      injection,
    })

    anEntity.id = 1
    anEntity.stringTest = "test"
    anEntity.booleanTest = true

    //when
    const ret = await itemRepo.delete(anEntity)

    //then
    assert.deepStrictEqual(ret, true)
  })
})
