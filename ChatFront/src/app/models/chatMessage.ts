export class ChatMessage {
    constructor(private sender: String,
        private receiver: String,
        private origin_lang: String,
        private date: Date,
        private message: String) { }
}