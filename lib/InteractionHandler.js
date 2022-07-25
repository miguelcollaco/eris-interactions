'use strict';

const EventEmitter = require('events').EventEmitter;

/**
 * An extremely simple and pretty straight forward interaction collector for Eris
 */
class InteractionHandler extends EventEmitter {
    constructor(message, options = {}) {
        super();

        this.client = (message.channel.guild) ? message.channel.guild.shard.client : message.channel.client;
        this.filter = options.filter;
        this.message = message;
        this.options = options;
        this.collected = [];
        this.listener = (interaction) => this.processInteraction(interaction);

        this.client.on('interactionCreate', this.listener);

        if (options.maxTime) {
            setTimeout(() => this.stopListening('timeEnd'), options.maxTime);
        }
    }

    /**
     * Verifys a interaction for its validity with the provided filter and if the maximum number of interactions has been reached
     * @param {object} interaction The interaction object
     */
    processInteraction(interaction) {
        if (this.message.id !== interaction.message.id) return;

        interaction.deferUpdate();

        if (this.options.filter) {
            if (!this.filter(interaction)) return;
            this.collected.push(interaction);
            this.emit('interaction', interaction);
        } else {
            this.collected.push(interaction);
            this.emit('interaction', interaction);
        }

        if (this.collected.length >= this.options.maxMatches) {
            this.stopListening('maxInteractions');
            return;
        }
    }

    /**
     * Stops collecting interactions and removes the listener from the client
     * @param {string} reason The reason for stopping
     */
    stopListening(reason) {
        this.client.removeListener('interactionCreate', this.listener);
        this.emit('end', this.collected, reason);
    }
}

module.exports = {
    interactionCollector: InteractionHandler,
};