export default {
    passwordSetByUserBtn: '//div[contains(text(),"Password set by user")]//parent::td//parent::tr//input',
    numericCharactersBtn:'//div[contains(text(),"Numeric characters")]//parent::td//parent::tr//input',
    uppercaseCharactersBtn:'//div[contains(text(),"Uppercase characters")]//parent::td//parent::tr//input',
    specialCharactersBtn:'//div[contains(text(),"Special characters")]//parent::td//parent::tr//input',
    editMaximumLengthBtn:'//button[@data-cy="edit-password-policies.maximum_length"]',
    editMaximumLengthInput:'//h5[contains(text(),"Maximum length")]//ancestor::div[@class="modal-content"]//input',
    editMinimumLengthBtn:'//button[@data-cy="edit-password-policies.minimum_length"]',
    editMinimumLengthInput:'//h5[contains(text(),"Minimum length")]//ancestor::div[@class="modal-content"]//input',
    editLoginFailedBtn:'//button[@data-cy="edit-password-policies.login_attempts"]',
    editLoginFailedInput:'//h5[contains(text(),"Login failed")]//ancestor::div[@class="modal-content"]//input',
    requireTwoStepAuthenticationBtn:'//div[contains(text(),"Require Two Step Authentication")]//parent::td//parent::tr//input',
    saveBtn:'//button[contains(text(),"Save")]',
}