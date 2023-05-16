'use strict';

const EventEmitter = require('events').EventEmitter;

/**
 * An extremely simple and pretty straight forward interaction collector for Eris
 *
 * @author Miguel Collaço
 */
class InteractionHandler extends EventEmitter {
    constructor(client, message, options = {}) {
        super();

        this.client     = client;
        this.filter     = options.filter;
        this.message    = message;
        this.options    = options;
        this.ended      = false;
        this.collected  = [];
        this.listener   = (interaction) => this.processInteraction(interaction);

        this.client.addListener('interactionCreate', this.listener);

        if (options.maxTime)
            setTimeout(() => this.stopListening('timeEnd'), options.maxTime);
    }

    /**
     * Verifies an interaction for its validity with the provided filter and if the maximum number of interactions has been reached
     * @param {object} interaction The interaction object
     */
    processInteraction(interaction) {
        if (this.message.id !== interaction.message.id) return;

        if (this.options.filter) {
            if (!this.filter(interaction)) return;
            this.collected.push(interaction);
            this.emit('interaction', interaction);
        } else {
            this.collected.push(interaction);
            this.emit('interaction', interaction);
        }

        if (this.collected.length >= this.options.maxMatches)
            this.stopListening('maxInteractions');
    }

    /**
     * Stops collecting interactions and removes the listener from the client
     * @param {string} reason The reason for stopping
     */
    stopListening(reason) {
        if (this.ended) return;
        this.ended = true;
        this.client.removeListener('interactionCreate', this.listener);
        this.emit('end', reason, this.collected);
    }
}

module.exports = { InteractionCollector: InteractionHandler };