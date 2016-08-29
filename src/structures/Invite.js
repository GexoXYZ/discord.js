const PartialGuild = require('./PartialGuild');
const PartialGuildChannel = require('./PartialGuildChannel');

/*
{ max_age: 86400,
  code: 'CG9A5',
  guild:
   { splash: null,
     id: '123123123',
     icon: '123123123',
     name: 'name' },
  created_at: '2016-08-28T19:07:04.763368+00:00',
  temporary: false,
  uses: 0,
  max_uses: 0,
  inviter:
   { username: '123',
     discriminator: '4204',
     bot: true,
     id: '123123123',
     avatar: '123123123' },
  channel: { type: 0, id: '123123', name: 'heavy-testing' } }
*/

/**
 * Represents an Invitation to a Guild Channel
 */
class Invite {
  constructor(client, data) {
    /**
     * The client that instantiated the invite
     * @type {Client}
     */
    this.client = client;
    this.setup(data);
  }

  setup(data) {
    /**
     * The maximum age of the invite, in seconds
     * @type {?Number}
     */
    this.maxAge = data.max_age;

    /**
     * The code for this invite
     * @type {String}
     */
    this.code = data.code;

    /**
     * The creation date of the invite
     * @type {Date}
     */
    this.creationDate = new Date(data.created_at);

    /**
     * Whether or not this invite is temporary
     * @type {Boolean}
     */
    this.temporary = data.temporary;

    /**
     * How many times this invite has been used
     * @type {Number}
     */
    this.uses = data.uses;

    /**
     * The maximum uses of this invite
     * @type {Number}
     */
    this.maxUses = data.max_uses;

    /**
     * The user who created this invite
     * @type {User}
     */
    this.inviter = this.client.dataManager.newUser(data.inviter);

    /**
     * The Guild the invite is for. If this Guild is already known, this will be a Guild object. If the Guild is
     * unknown, this will be a Partial Guild.
     * @type {Guild|PartialGuild}
     */
    this.guild = this.client.guilds.get(data.guild.id) || new PartialGuild(this.client, data.guild);

    /**
     * The Channel the invite is for. If this Channel is already known, this will be a GuildChannel object.
     * If the Channel is unknown, this will be a Partial Guild Channel.
     * @type {GuildChannel|PartialGuildChannel}
     */
    this.channels = this.client.channels.get(data.channel.id) || new PartialGuildChannel(this.client, data.channel);
  }

  /**
   * Deletes this invite
   * @returns {Promise<Invite, Error>}
   */
  delete() {
    return this.client.rest.methods.deleteInvite(this);
  }
}

module.exports = Invite;