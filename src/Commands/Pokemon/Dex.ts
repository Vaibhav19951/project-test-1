import { BaseCommand, Command, Message } from '../../Structures'
import { IArgs } from '../../Types'

@Command('pokedex', {
    description: 'dex',
    aliases: ['dex'],
    exp: 20,
    cooldown: 5,
    usage: '',
    category: 'pokemon'
})
export default class command extends BaseCommand {
    override execute = async (M: Message): Promise<void> => {
        const { party, pc } = await this.client.DB.getUser(M.sender.jid)
        const pokemons = [...party, ...pc]
        if (pokemons.length < 1) return void M.reply('nahi hai koi pokemon')
        let text = `*Pokedex*\n`
        pokemons.forEach((x) => (text += `\n*❯ ${this.client.utils.capitalize(x.name)}*`))
        return void (await M.reply(text))
    }
}
