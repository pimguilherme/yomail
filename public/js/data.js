var names = [
        'Guilherme',
        'Pedro',
        'Fábio',
        'Rafael',
        'Augusto',
        'Carmen',
        'Lúcio',
        'Raimundo',
        'Herbert'
    ]
    , lastNames = [
        'Alves',
        'Pim',
        'Castro',
        'Silva',
        'Souza',
        'Murad',
        'Paskin',
        'Neves'
    ]
    , letters = 'abcefgohi'
    , words = ["There", "are", "many", "variations", "of", "passages", "of", "Lorem", "Ipsum", "available,", "but", "the", "majority", "have", "suffered", "alteration", "in", "some", "form,", "by", "injected", "humour,", "or", "randomised", "words", "which", "don't", "look", "even", "slightly", "believable.", "If", "you", "are", "going", "to", "use", "a", "passage", "of", "Lorem", "Ipsum,", "you", "need", "to", "be", "sure", "there", "isn't", "anything", "embarrassing", "hidden", "in", "the", "middle", "of", "text.", "All", "the", "Lorem", "Ipsum", "generators", "on", "the", "Internet", "tend", "to", "repeat", "predefined", "chunks", "as", "necessary,", "making", "this", "the", "first", "true", "generator", "on", "the", "Internet.", "It", "uses", "a", "dictionary", "of", "over", "200", "Latin", "words,", "combined", "with", "a", "handful", "of", "model", "sentence", "structures,", "to", "generate", "Lorem", "Ipsum", "which", "looks", "reasonable.", "The", "generated", "Lorem", "Ipsum", "is", "therefore", "always", "free", "from", "repetition,", "injected", "humour,", "or", "non-characteristic", "words", "etc."]

var emails = []
    , createEmail = function () {
        return {
            name:names.random() + " " + lastNames.random(),
            email:randomWord(6 + Math.random() * 6) + "@" + randomWord(6 + Math.random() * 6) + '.com',
            subject:[words.random(), words.random(), words.random(), words.random(), words.random(), words.random(), words.random()].join(' '),
            date:Math.random() > 0.5 ? new Date(1930 + Math.random() * 80, Math.random() * 11, Math.random() * 28) : new Date()
        }
    }
    , randomWord = function (n) {
        var s = ""
        while (s.length < n) {
            s += letters.random()
        }
        return s
    }

for (var i = 0; i < 80 + Math.random() * 30; i++) {
    var email = createEmail()
    email.id = i
    emails.push(email)
}

window.DATA = {
    emails:emails
}
