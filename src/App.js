import React, { Component } from 'react';
import classes from './App.css';

import Ability from './components/Ability/Ability';

class App extends Component {
  state = {
    characterName: 'Tarkhal',
    characterLevel: 10,  //retrieved from server
    proficiencyBonus: null,

    strengthScore: 18,
    strengthModifier: null, 
    strengthSavingProficient: true,

    dexterityScore: 16,
    dexterityModifier: null,
    dexteritySavingProficient: false,

    constitutionScore: 14,
    constitutionModifier: null,
    constitutionSavingProficient: true,

    intelligenceScore: 12,
    intelligenceModifier: null,
    intelligenceSavingProficient: false,

    wisdomScore: 17,
    wisdomModifier: null,
    wisdomSavingProficient: false,

    charismaScore: 8,
    charismaModifier: null,
    charismaSavingProficient: false,

    acrobaticsProficient: false,
    animalHandlingProficient: false,
    arcanaProficient: true,
    athleticsProficient: true,
    deceptionProficient: false,
    historyProficient: false,
    insightProficient: true,
    intimidationProficient: false,
    investigationProficient: false,
    medicineProficient: false,
    natureProficient: false,
    perceptionProficient: true,
    performanceProficient: false,
    persuasionProficient: true,
    religionProficient: false,
    sleightOfHandProficient: false,
    stealthProficient: false,
    survivalProficient: false,

    acrobaticsModifier: null,
    animalHandlingModifier: null,
    arcanaModifier: null,
    athleticsModifier: null,
    deceptionModifier: null,
    historyModifier: null,
    insightModifier: null,
    intimidationModifier: null,
    investigationModifier: null,
    medicineModifier: null,
    natureModifier: null,
    perceptionModifier: null,
    performanceModifier: null,
    persuasionModifier: null,
    religionModifier: null,
    sleightOfHandModifier: null,
    stealthModifier: null,
    survivalModifier: null,
  }
  

  async componentDidMount() {
    try {
      console.log('[App.js] [componentDidMount] initializing player proficiencyBonus');
      await this.initializeCharacterProficiency();
      const proficiencyResponse = await this.characterProficiencyInitialization();
      console.log(proficiencyResponse);
      console.log('[App.js] [componentDidMount] initializing ability modifiers');
      await this.initializeModifiers();
      const abilityModifierResponse = await this.abilityModifierInitialization();
      console.log('[App.js]' + abilityModifierResponse);
      console.log('[App.js] Initializing Skill Modifiers');
      await this.initializeSkillModifiers();
      const skillModifierResponse = await this.skillModifiersInitialization();
      console.log('[App.js]' + skillModifierResponse);      
    } catch (error) {
      console.log('ERROR [App.js]' + error);
    }

  }
  initializeCharacterProficiency = () => {
    const characterLevel = this.state.characterLevel;
    this.setState({proficiencyBonus: this.calculateProficiency(characterLevel)});
  }
  characterProficiencyInitialization = () => {
    return new Promise((resolve, reject) => {
      if(this.state.proficiencyBonus !== null) {
        resolve('[characterProficiencyInitialization] Proficiency Initialized');
      } else {
        reject('[characterProficiencyInitialization] Proficiency Initialization Failed');
      }
    })
  }
  initializeModifiers = () => {
    const strengthScore = this.state.strengthScore;
    const dexterityScore = this.state.dexterityScore;
    const constitutionScore = this.state.constitutionScore;
    const intelligenceScore = this.state.intelligenceScore;
    const wisdomScore = this.state.wisdomScore;
    const charismaScore = this.state.wisdomScore;
      this.setState({strengthModifier: this.calculateModifier(strengthScore),
        dexterityModifier: this.calculateModifier(dexterityScore),
        constitutionModifier: this.calculateModifier(constitutionScore),
        intelligenceModifier: this.calculateModifier(intelligenceScore),
        wisdomModifier: this.calculateModifier(wisdomScore),
        charismaModifier: this.calculateModifier(charismaScore),
      });
  }
  abilityModifierInitialization = () => {
    return new Promise((resolve, reject) => {
      if(this.state.strengthModifier || this.state.dexterityModifier || this.state.constitutionModifier || this.state.intelligenceModifier || this.state.wisdomModifier || this.state.charismaModifier) {
        resolve('[abilityModifierInitialization] Ability Modifiers Initialized')
      } else {
        reject('[abilityModifierInitialization] Ability Modifiers Initialization FAILED');
      }
    })
  }
  skillModifiersInitialization = () => {
    let failed = false;
      let rejectString = '';
      if(!this.state.acrobaticsModifier || !this.state.stealthModifier || !this.state.sleightOfHandModifier) {
        failed = true;
        rejectString += 'Dexterity';
      }
      if(!this.state.athleticsModifier) {
        failed = true;
        rejectString += ', Strength';
      }
      if(!this.state.animalHandlingModifier || !this.state.insightModifier || !this.state.medicineModifier || !this.state.perceptionModifier || !this.state.survivalModifier) {
        failed = true;
        rejectString += ', Wisdom';
      }
      if(!this.state.arcanaModifier || !this.state.historyModifier || !this.state.investigationModifier || !this.state.natureModifier || !this.state.religionModifier) {
        failed = true;
        rejectString += ', Intelligence';
      }
      if(!this.state.deceptionModifier || !this.state.intimidationModifier || !this.state.performanceModifier || !this.state.persuasionModifier) {
        failed = true;
        rejectString += ', Charisma';
      }
    return new Promise((resolve, reject) => {
      if(failed) {
        reject('[skillModifiersInitialization] ' + rejectString + ' Skill Modifiers FAILED');
      } else {
        resolve('[skillModifiersInitialization] Skill Modifiers Initialized');

      }
    })
  }

  initializeSkillModifiers = () => {
    const strengthModifier = this.state.strengthModifier;
    const dexterityModifier = this.state.dexterityModifier;
    const intelligenceModifier = this.state.intelligenceModifier;
    const wisdomModifier = this.state.wisdomModifier;
    const charismaModifier = this.state.charismaModifier;
    const acrobaticsProficient = this.state.acrobaticsProficient;
    const animalHandlingProficient= this.state.animalHandlingProficient;
    const arcanaProficient= this.state.arcanaProficient;
    const athleticsProficient= this.state.athleticsProficient;
    const deceptionProficient= this.state.deceptionProficient;
    const historyProficient= this.state.historyProficient;
    const insightProficient= this.state.insightProficient;
    const intimidationProficient= this.state.intimidationProficient;
    const investigationProficient= this.state.investigationProficient;
    const medicineProficient= this.state.medicineProficient;
    const natureProficient= this.state.natureProficient;
    const perceptionProficient= this.state.perceptionProficient;
    const performanceProficient= this.state.performanceProficient;
    const persuasionProficient= this.state.persuasionProficient;
    const religionProficient= this.state.religionProficient;
    const sleightOfHandProficient= this.state.sleightOfHandProficient;
    const stealthProficient= this.state.stealthProficient;
    const survivalProficient= this.state.survivalProficient;

    this.setState({
      acrobaticsModifier: this.calculateSkillModifier(dexterityModifier, acrobaticsProficient),
      animalHandlingModifier: this.calculateSkillModifier(wisdomModifier, animalHandlingProficient),
      arcanaModifier: this.calculateSkillModifier(intelligenceModifier, arcanaProficient),
      athleticsModifier: this.calculateSkillModifier(strengthModifier, athleticsProficient),
      deceptionModifier: this.calculateSkillModifier(charismaModifier, deceptionProficient),
      historyModifier: this.calculateSkillModifier(intelligenceModifier, historyProficient),
      insightModifier: this.calculateSkillModifier(wisdomModifier, insightProficient),
      intimidationModifier: this.calculateSkillModifier(charismaModifier, intimidationProficient),
      investigationModifier: this.calculateSkillModifier(intelligenceModifier, investigationProficient),
      medicineModifier: this.calculateSkillModifier(wisdomModifier, medicineProficient),
      natureModifier: this.calculateSkillModifier(intelligenceModifier, natureProficient),
      perceptionModifier: this.calculateSkillModifier(wisdomModifier, perceptionProficient),
      performanceModifier: this.calculateSkillModifier(charismaModifier, performanceProficient),
      persuasionModifier: this.calculateSkillModifier(charismaModifier, persuasionProficient),
      religionModifier: this.calculateSkillModifier(intelligenceModifier, religionProficient),
      sleightOfHandModifier: this.calculateSkillModifier(dexterityModifier, sleightOfHandProficient),
      stealthModifier: this.calculateSkillModifier(dexterityModifier, stealthProficient),
      survivalModifier: this.calculateSkillModifier(wisdomModifier, survivalProficient),
    });
  }
  
  calculateProficiency = (level) => {
    if(this.state.characterLevel) {
      if(level < 5) {
        return 2;
      } else if (level < 9) {
        return 3;
      } else if (level < 13) {
        return 4;
      } else if (level < 17) {
        return 5;
      } else if (level === 20) {
        return 6;
      }
    } else {
      console.log('[App.js] calculateProficiency, characterLevel is null');  
    }

  }
  calculateModifier = (score) => {
    if(score === 1) {
      return -5;
    } else if (score < 4) {
      return -4;
    } else if (score < 6) {
      return -3;
    } else if (score < 8) {
      return -2;
    } else if (score < 10) {
      return -1;
    } else if (score < 12) {
      return 0;
    } else if (score < 14) {
      return 1;
    } else if (score < 16) {
      return 2;
    } else if (score < 18) {
      return 3;
    } else if (score < 20) {
      return 4;
    } else if (score < 22) {
      return 5;
    } else if (score < 24) {
      return 6;
    } else if (score < 26) {
      return 8;
    } else if (score < 28) {
      return 9;
    } else {
      return 10;
    }
  }

  calculateSkillModifier = (abilityModifier, proficient) => {
    if(proficient) {
      return abilityModifier + this.state.proficiencyBonus;
    } else {
      return abilityModifier;
    }
  }

  skillProficiencyChanged = (event) => {
    this.setState({acrobatics: !event.target.value});

  }
  abilityScoreChanged = (event) => {
    // console.log(event.target.value);
    let number = parseInt(event.target.value, 10);
    this.setState({strengthScore: number});
  }
  abilityScoreOnFocus = (event) => {
    event.target.value = this.state.strengthScore;
  }
  abilityScoreOnBlur = (event) => {
    event.target.value = '';
  }

  render() {
    // console.log(this.state.strengthModifier);
    return (
      <div className={classes.App}>
        <div className={classes.characterName}>
          <p>Character Name</p>
          <input name='characterName' placeholder={this.state.characterName}/>
        </div>
        <div>
          <p>Proficiency: {this.calculateProficiency(this.state.characterLevel)}</p>
          <p>Passive Perception: {10 + this.state.wisdomModifier}</p>
        </div>
        <div className={classes.AbilityScoreContainer}>
          <div className={[classes.AbilityScore].join(' ')}>
            <p>Strength</p>
            <Ability changed={this.abilityScoreChanged} score={this.state.strengthScore} modifier={this.state.strengthModifier}/>
            {/* <input onBlur={this.abilityScoreOnBlur} onChange={this.abilityScoreChanged} onFocus={this.abilityScoreOnFocus} placeholder={this.state.strengthScore ? this.state.strengthScore : 0} /> */}
            {/* <p>{this.state.strengthScore}</p> */}
            {/* <p>{this.state.strengthModifier}</p> */}
          </div>
          <div className={[classes.AbilityScore].join(' ')}>
            <p>Dexterity</p>
            <input onBlur={this.abilityScoreOnBlur} onChange={this.abilityScoreChanged} onFocus={this.abilityScoreOnFocus} placeholder={this.state.dexterityScore ? this.state.dexterityScore : 0}/>
            <p>{this.state.dexterityModifier}</p>
          </div>
          <div className={[classes.AbilityScore].join(' ')}>
            <p>Constitution</p>
            <input placeholder={this.state.constitutionScore}/>
            <p>{this.state.constitutionModifier}</p>
          </div>
          <div className={[classes.AbilityScore].join(' ')}>
            <p>Intelligence</p>
            <input placeholder={this.state.intelligenceScore} />
            <p>{this.state.constitutionModifier}</p>
          </div>
          <div className={[classes.AbilityScore].join(' ')}>
            <p>Wisdom</p>
            <input placeholder={this.state.wisdomScore}/>
            <p>{this.state.wisdomModifier}</p>
          </div>
          <div className={[classes.AbilityScore].join(' ')}>
            <p>Charisma</p>
            <input placeholder={this.state.charismaScore}/>
            <p>{this.state.charismaModifier}</p>
          </div>
        </div>
        
        <div className={classes.SkillModifierContainer}>
          <div className={[classes.SkillModifier].join(' ')}>
            <p>Acrobatics</p>
            <input placeholder={this.state.acrobaticsModifier}/>
            <p></p>
          </div>
          <div>
            <p>Animal Handling</p>
            <input placeholder={this.state.animalHandlingModifier} />
            <p></p>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
