import { AbilityBuilder, createMongoAbility } from '@casl/ability'

export default function defineAbility(abilities) {
  const { can, build } = new AbilityBuilder(createMongoAbility)

  abilities.forEach((ability) => {
    can(ability.action, ability.subject)
  })

  return build()
}
