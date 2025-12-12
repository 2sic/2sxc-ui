import { ToolUrlObjects, isNumeric } from '../../../src/tools/obj2url';
import { describe, expect, test } from "vitest";

describe('In the file obj2url.ts', () => {


  describe('the class ToolUrlObjects', () => {

    describe('toUrl', () => {
      test('convert object to url', () => {
        const obj = { hello: 7, name: "daniel", sub: { subname: "mettler", subage: 27, subsub: { and: "like" } }, final: 42 };
        const url = '~.hello=7~.name=daniel~.sub~..subname=mettler~..subage=27~..subsub~...and=like~.final=42';
        expect(url).toEqual(new ToolUrlObjects().toUrl(obj))
      });
      test('convert object to url with encoding', () => {
        const obj = { prop1: 1, prop2: "&", sub: { prop3: "Š", prop4: 28 }};
        const url = '~.prop1=1~.prop2=%26~.sub~..prop3=%C5%A0~..prop4=28';
        expect(url).toEqual(new ToolUrlObjects().toUrl(obj, true))
      });
    });


    describe('toObj', () => {
      test('convert url to object', () => {
        let url: string = '~.hello=7~.name=daniel~.sub~..subname=mettler~..subage=27~..subsub~...and=like~.final=42';
        let obj: unknown = { hello: 7, name: "daniel", sub: { subname: "mettler", subage: 27, subsub: { and: "like" } }, final: 42 };
        expect(obj).toEqual(new ToolUrlObjects().toObj(url));
      });
      test('convert url to object with encoding', () => {
        const url = '~.prop1=1~.prop2=%26~.sub~..prop3=%C5%A0~..prop4=28';
        const obj: unknown = { prop1: 1, prop2: "&", sub: { prop3: "Š", prop4: 28 }};
        expect(obj).toEqual(new ToolUrlObjects().toObj(url, true));
      });
    });


    describe('back', () => {
      test('convert url to record', () => {
        const url = '~.prop1=1~.prop2=2~.sub~..prop3=3~..prop4=4';
        const obj: unknown = { prop1: '1', prop2: '2', sub: null, "sub.prop3": '3', "sub.prop4": '4' };
        expect(obj).toEqual(new ToolUrlObjects().back(url, false));
      });
      test('convert url to record with encoding', () => {
        const url = '~.prop1=1~.prop2=%26~.sub~..prop3=%C5%A0~..prop4=28';
        const obj: unknown = { prop1: 1, prop2: "&", sub: null, "sub.prop3": "Š", "sub.prop4": 28 };
        expect(obj).toEqual(new ToolUrlObjects().back(url, true));
      });
    });
  });


  // describe('the function arrayFlat', () => {
  //   test('test');
  // });


  // describe('the function unflatStringsToObj', () => {
  //   test('test');
  // });


  describe('the function isNumeric', () => {
    test('check for string type', () => {
      expect(false).toEqual(isNumeric(1 as any));
    });
    test('string is numeric', () => {
      expect(true).toEqual(isNumeric("1"));
    });
    test('string is not numeric', () => {
      expect(false).toEqual(isNumeric("a"));
    });
    test('string is white space', () => {
      expect(false).toEqual(isNumeric(" "));
    });
    test('null handling', () => {
      expect(false).toEqual(isNumeric(null as any));
    });
    test('undefined handling', () => {
      expect(false).toEqual(isNumeric(undefined as any));
    });
    test('boolean true', () => {
      expect(false).toEqual(isNumeric('true'));
    });
  });


  // describe('the function customEncode', () => {
  //   test('test');
  // });


  // describe('the function restoreValue', () => {
  //   test('test');
  // });


  // describe('the function restoreString', () => {
  //   test('test');
  // });
});
