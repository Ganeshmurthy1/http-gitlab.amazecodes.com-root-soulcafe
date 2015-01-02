<?php

/**
 *
 *  Bad Words Bad
 *
 *  BWB is a small library for handling profanity words.
 *
 *  @author     Sebi Popa <hello@sebipopa.com>
 *  @version    1.0 (last revision: October 21, 2013)
 *  @copyright  (c) 2013 Sebi Popa
 *  @package    BWB
 */

class BWB {

    private $language;

    private $path;

    function __construct()
    {

        $this->path = preg_replace('/\\\/', '/', dirname(__FILE__));

        $this->language('romanian');

    }

    /**
     * Sets the current language
     * @param string $language
     */
    function language($language)
    {

        $this->language = $language;

    }

    /**
     * Fetches the word list from the language file
     *
     * @return string
     */
    private function get_word_list()
    {

        // Check for file
        if (!file_exists($this->path . '/languages/' . $this->language . '.txt')) {
            trigger_error('The language file was not found.', E_USER_ERROR);
        }

        // Get the list of words
        return file_get_contents($this->path . '/languages/' . $this->language . '.txt');

    }

    /**
     * Checks if a given string contains profanity words
     * @param string $input
     * @return boolean
     */
    function has_bad_words($input)
    {

       // Get word list
//         $word_list = $this->get_word_list();
//         //print_r($word_list);

//         // Quote regex characters
//         if (function_exists('preg_quote')) {
//             $filterRegex = preg_quote(trim($word_list));
//         }

//        // Prepare string for preg_match
//        print  $filterRegex = '/(' . preg_replace('/\n/', '|', $filterRegex) . ')/i';

      $filterRegex = '/(﻿niggeranus|arse|arsehole|ass|ass\-hat|ass\-pirate|assbag|assbandit|assbanger|assbite|assclown|asscock|asscracker|assface|assfuck|assfucker|assgoblin|asshat|asshead|asshole|asshopper|assjacker|asslick|asslicker|assmonkey|assmunch|assmuncher|assnigger|asspirate|assshit|assshole|asssucker|asswad|asswipe|bampot|bastard|beaner|beastial|beastiality|beastility|bestial|bestiality|bitch|bitchass|bitcher|bitchin|bitching|bitchtit|bitchy|blowjob|blowjob|bollocks|bollox|boner|brotherfucker|bullshit|bullshit|bumblefuck|buttplug|butt\-pirate|buttfucka|buttfucker|cameltoe|carpetmuncher|chinc|chink|choad|chode|clit|clitface|clitfuck|clusterfuck|cock|cockassJerk|cockbite|cockburger|cockface|cockfucker|cockhead|cockjockey|cockknoker|cockmaster|cockmongler|cockmongruel|cockmonkey|cockmuncher|cocknose|cocknugget|cockshit|cocksmith|cocksmoker|cocksuck|cocksucked|cocksucker|cocksucking|cocksucks|coochie|coochy|coon|cooter|cracker|cum|cumbubble|cumdumpster|cumguzzler|cumjockey|cummer|cumming|cumshot|cumslut|cumtart|cunillingus|cunnie|cunnilingus|cunnilingus|cunt|cuntface|cunthole|cuntlick|cuntlicker|cuntlicking|cuntrag|cuntslut|cyberfuc|cyberfuck|cyberfucked|cyberfucker|cyberfucking|dago|deggo|dick|dickbag|dickbeaters|dickface|dickfuck|dickfucker|dickhead|dickhole|dickjuice|dickmilk|dickmonger|dickslap|dicksucker|dickwad|dickweasel|dickweed|dickwod|dike|dildo|dink|dipshit|doochbag|dookie|douche|douche\-fag|douchebag|douchewaffle|dumass|dumbass|dumbass|dumbfuck|dumbshit|dumshit|dyke|ejaculate|ejaculated|ejaculates|ejaculating|ejaculation|fag|fagbag|fagfucker|fagging|faggit|faggot|faggot|faggotcock|faggs|fagot|fags|fagtard|fart|farted|farting|farty|fatass|felatio|fellatio|fellatio|feltch|fingerfuck|fingerfucked|fingerfucker|fingerfucking|fingerfucks|fistfuck|fistfucked|fistfucker|fistfucking|flamer|fuck|fuckass|fuckbag|fuckboy|fuckbrain|fuckbutt|fucked|fucker|fuckersucker|fuckface|fuckhead|fuckhole|fuckin|fucking|fuckme|fucknut|fucknutt|fuckoff|fuckstick|fucktard|fuckup|fuckwad|fuckwit|fuckwitt|fudgepacker|fuk|gangbang|gangbanged|gay|gayass|gaybob|gaydo|gayfuck|gayfuckist|gaylord|gaysex|gaytard|gaywad|goddamnblasphemy|goddamnblasphemy|goddamnitblasphemy|gooch|gook|gringo|guido|handjob|hardcoresex|heeb|hoe|homo|homodumbshit|honkey|horniest|horny|hotsex|humping|jackass|jap|jigaboo|jism|jiz|jizm|jizz|junglebunny|junglebunny|kike|kock|kondum|kooch|kootch|kum|kumer|kummer|kumming|kums|kunilingus|kunt|kyke|lesbian|lesbo|lezzie|lust|lusting|mcfagget|mick|minge|mothafuck|mothafucka|mothafuckaz|mothafucked|mothafucker|mothafuckin|mothafucking|mothafucks|motherfuck|motherfucked|motherfucker|motherfuckin|motherfucking|muff|muffdiver|munging|negro|nigga|nigger|niglet|nutsack|nutsack|orgasim|orgasm|paki|panooch|pecker|peckerhead|penis|penisfucker|penispuffer|phonesex|phuk|phuked|phuking|phukked|phukking|phuks|phuq|pis|pises|pisin|pising|pisof|piss|pissed|pisser|pisses|pissflaps|pissin|pissing|pissoff|polesmoker|pollock|poon|poonani|poonany|poontang|porchmonkey|porchmonkey|porn|porno|pornography|pornos|prick|punanny|punta|pusies|pussies|pussy|pussylicking|pusy|puto|queef|queer|queerbait|queerhole|renob|rimjob|ruski|sandnigger|schlong|scrote|shit|shitass|shitbag|shitbagger|shitbrain|shitbreath|shitcunt|shitdick|shited|shitface|shitfaced|shitfull|shithead|shithole|shithouse|shiting|shitspitter|shitstain|shitted|shitter|shittiest|shitting|shitty|shity|shiz|shiznit|skank|skeet|skullfuck|slut|slut|slutbag|sluts|smeg|smut|snatch|spic|spick|splooge|spunk|tard|testicle|thundercunt|tit|titfuck|tittyfuck|twat|twatlips|twatwaffle|unclefucker|va\-j\-j|vag|vagina|vjayjay|wank|wetback|whore|whorebag|whoreface|wop)/i';
      
        // Return the result
        return (bool)preg_match($filterRegex, $input);

    }
    
    function sanitizeString($input) {
      $pattern = "/[^@\s]*@[^@\s]*\.[^@\s]*/";
      $replacement = "[email-removed]";
      $op = preg_replace($pattern, $replacement, $input);
      
      $op = preg_replace('/\+?[0-9][0-9()-\s+]{4,20}[0-9]/', '[mobile-removed]', $op);
      
      $op = str_replace('<a href=', '<a rel="nofollow" href=',  $op);
      
      return $op;      
    }

}