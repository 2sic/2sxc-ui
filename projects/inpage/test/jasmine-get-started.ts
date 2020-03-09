//import 'jasmine';

//describe("A suite", () => {
//  it("contains spec with an expectation", () => {
//    expect(true).toBe(true);
//  });
//});

//describe("A suite is just a function", function () {
//  var a;

//  it("and so is a spec", function () {
//    a = true;

//    expect(a).toBe(true);
//  });
//});

//describe("The 'toBe' matcher compares with ===", function () {

//  it("and has a positive case", function () {
//    expect(true).toBe(true);
//  });

//  it("and can have a negative case", function () {
//    expect(false).not.toBe(true);
//  });

//});

//describe("A suite with some shared setup", function () {
//  var foo = 0;

//  beforeEach(function () {
//    foo += 1;
//  });

//  afterEach(function () {
//    foo = 0;
//  });

//  beforeAll(function () {
//    foo = 1;
//  });

//  afterAll(function () {
//    foo = 0;
//  });

//});

//describe("A spec", function () {
//  beforeEach(function () {
//    this.foo = 0;
//  });

//  it("can use the `this` to share state", function () {
//    expect(this.foo).toEqual(0);
//    this.bar = "test pollution?";
//  });

//  it("prevents test pollution by having an empty `this` created for the next spec", function () {
//    expect(this.foo).toEqual(0);
//    expect(this.bar).toBe(undefined);
//  });
//});

//describe("A spec using the fail function", function () {
//  var foo = function (x, callBack) {
//    if (x) {
//      callBack();
//    }
//  };

//  it("should not call the callBack", function () {
//    foo(false, function () {
//      fail("Callback has been called");
//    });
//  });
//});

//describe("A spec", function () {
//  var foo;

//  beforeEach(function () {
//    foo = 0;
//    foo += 1;
//  });

//  afterEach(function () {
//    foo = 0;
//  });

//  it("is just a function, so it can contain any code", function () {
//    expect(foo).toEqual(1);
//  });

//  it("can have more than one expectation", function () {
//    expect(foo).toEqual(1);
//    expect(true).toEqual(true);
//  });

//  describe("nested inside a second describe", function () {
//    var bar;

//    beforeEach(function () {
//      bar = 1;
//    });

//    it("can reference both scopes as needed", function () {
//      expect(foo).toEqual(bar);
//    });
//  });
//});

//xdescribe("A spec", function () {
//  var foo;

//  beforeEach(function () {
//    foo = 0;
//    foo += 1;
//  });

//  it("is just a function, so it can contain any code", function () {
//    expect(foo).toEqual(1);
//  });
//});

//describe("Pending specs", function () {
//  xit("can be declared 'xit'", function () {
//    expect(true).toBe(false);
//  });
//  it("can be declared with 'it' but without a function");
//  it("can be declared by calling 'pending' in the spec body", function () {
//    expect(true).toBe(false);
//    pending('this is why it is pending');
//  });
//});

//describe("A spy", function () {
//  var foo, bar = null;

//  beforeEach(function () {
//    foo = {
//      setBar: function (value) {
//        bar = value;
//      }
//    };

//    spyOn(foo, 'setBar');

//    foo.setBar(123);
//    foo.setBar(456, 'another param');
//  });

//  it("tracks that the spy was called", function () {
//    expect(foo.setBar).toHaveBeenCalled();
//  });

//  it("tracks that the spy was called x times", function () {
//    expect(foo.setBar).toHaveBeenCalledTimes(2);
//  });

//  it("tracks all the arguments of its calls", function () {
//    expect(foo.setBar).toHaveBeenCalledWith(123);
//    expect(foo.setBar).toHaveBeenCalledWith(456, 'another param');
//  });

//  it("stops all execution on a function", function () {
//    expect(bar).toBeNull();
//  });

//  it("tracks if it was called at all", function () {
//    foo.setBar();

//    expect(foo.setBar.calls.any()).toEqual(true);
//  });
//});


//describe("A spy, when created manually", function () {
//  var whatAmI;

//  beforeEach(function () {
//    whatAmI = jasmine.createSpy('whatAmI');

//    whatAmI("I", "am", "a", "spy");
//  });

//  it("tracks that the spy was called", function () {
//    expect(whatAmI).toHaveBeenCalled();
//  });
//});

//describe("Multiple spies, when created manually", function () {
//  var tape;

//  beforeEach(function () {
//    tape = jasmine.createSpyObj('tape', ['play', 'pause', 'stop', 'rewind']);

//    tape.play();
//    tape.pause();
//    tape.rewind(0);
//  });

//  it("creates spies for each requested function", function () {
//    expect(tape.play).toBeDefined();
//    expect(tape.pause).toBeDefined();
//    expect(tape.stop).toBeDefined();
//    expect(tape.rewind).toBeDefined();
//  });
//});

//describe("Matching with finesse", function () {
//  describe("jasmine.any", function () {
//    it("matches any value", function () {
//      expect({}).toEqual(jasmine.any(Object));
//      expect(12).toEqual(jasmine.any(Number));
//    });

//    describe("when used with a spy", function () {
//      it("is useful for comparing arguments", function () {
//        var foo = jasmine.createSpy('foo');
//        foo(12, function () {
//          return true;
//        });

//        expect(foo).toHaveBeenCalledWith(jasmine.any(Number), jasmine.any(Function));
//      });
//    });
//  });

//  describe("jasmine.anything", function () {
//    it("matches anything", function () {
//      expect(1).toEqual(jasmine.anything());
//    });

//    describe("when used with a spy", function () {
//      it("is useful when the argument can be ignored", function () {
//        var foo = jasmine.createSpy('foo');
//        foo(12, function () {
//          return false;
//        });

//        expect(foo).toHaveBeenCalledWith(12, jasmine.anything());
//      });
//    });
//  });

//  describe("jasmine.objectContaining", function () {
//    var foo;

//    beforeEach(function () {
//      foo = {
//        a: 1,
//        b: 2,
//        bar: "baz"
//      };
//    });

//    it("matches objects with the expect key/value pairs", function () {
//      expect(foo).toEqual(jasmine.objectContaining({
//        bar: "baz"
//      }));
//      expect(foo).not.toEqual(jasmine.objectContaining({
//        c: 37
//      }));
//    });

//    describe("when used with a spy", function () {
//      it("is useful for comparing arguments", function () {
//        var callback = jasmine.createSpy('callback');

//        callback({
//          bar: "baz"
//        });

//        expect(callback).toHaveBeenCalledWith(jasmine.objectContaining({
//          bar: "baz"
//        }));
//      });
//    });
//  });

//  describe("jasmine.arrayContaining", function () {
//    var foo;

//    beforeEach(function () {
//      foo = [1, 2, 3, 4];
//    });

//    it("matches arrays with some of the values", function () {
//      expect(foo).toEqual(jasmine.arrayContaining([3, 1]));
//      expect(foo).not.toEqual(jasmine.arrayContaining([6]));
//    });

//    describe("when used with a spy", function () {
//      it("is useful when comparing arguments", function () {
//        var callback = jasmine.createSpy('callback');

//        callback([1, 2, 3, 4]);

//        expect(callback).toHaveBeenCalledWith(jasmine.arrayContaining([4, 2, 3]));
//        expect(callback).not.toHaveBeenCalledWith(jasmine.arrayContaining([5, 2]));
//      });
//    });
//  });

//  describe('jasmine.stringMatching', function () {
//    it("matches as a regexp", function () {
//      expect({ foo: 'bar' }).toEqual({ foo: jasmine.stringMatching(/^bar$/) });
//      expect({ foo: 'foobarbaz' }).toEqual({ foo: jasmine.stringMatching('bar') });
//    });

//    describe("when used with a spy", function () {
//      it("is useful for comparing arguments", function () {
//        var callback = jasmine.createSpy('callback');

//        callback('foobarbaz');

//        expect(callback).toHaveBeenCalledWith(jasmine.stringMatching('bar'));
//        expect(callback).not.toHaveBeenCalledWith(jasmine.stringMatching(/^bar$/));
//      });
//    });
//  });

//  describe("custom asymmetry", function () {
//    var tester = {
//      asymmetricMatch: function (actual) {
//        var secondValue = actual.split(',')[1];
//        return secondValue === 'bar';
//      }
//    };

//    it("dives in deep", function () {
//      expect("foo,bar,baz,quux").toEqual(tester);
//    });

//    describe("when used with a spy", function () {
//      it("is useful for comparing arguments", function () {
//        var callback = jasmine.createSpy('callback');

//        callback('foo,bar,baz');

//        expect(callback).toHaveBeenCalledWith(tester);
//      });
//    });
//  });
//});









