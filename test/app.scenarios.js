describe('text box scenario', function () {
  beforeEach(function () {
    browser().navigateTo('/');
  });
  it('should disable submit/tryagain/showans buttons on page/template load', function () {
    expect(element('button:contains("Submit")').attr('disabled')).toBe('disabled');
    expect(element('button:contains("Try Again")').attr('disabled')).toBe('disabled');
    expect(element('button:contains("Show Answer")').attr('disabled')).toBe('disabled');
  });

  it('should set attempt 1 of N', function () {
    expect(element('div[ng-controller="FooterCtrl"] div.pull-left:first > button:eq(0)').html()).toContain('Attempt 1 of');
  });

  it('should set template 1 of N', function () {
    expect(element('div[ng-controller="FooterCtrl"] div.pull-right:last > button:eq(1)').html()).toContain('1 of');
  });
});
