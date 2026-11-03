import test from 'node:test';import assert from 'node:assert/strict';
import {preparationCourses,preparationResources,dailyRhythm,preparationJournal} from '../lib/recruitment/preparation-curriculum.ts';
test('both induction pathways fit fourteen practical three-hour days with valid references',()=>{
 assert.equal(dailyRhythm.reduce((sum,item)=>sum+item.minutes,0),180);
 const ids=new Set(preparationResources.map(item=>item.id));assert.equal(ids.size,preparationResources.length);
 for(const course of Object.values(preparationCourses)){
  assert.equal(course.days.length,14);assert.deepEqual(course.days.map(item=>item.day),Array.from({length:14},(_,i)=>i+1));
  for(const day of course.days){assert(day.explain.length>250);assert(day.build.length>=3);assert(day.output.length>20);assert(day.teachBack.length>20);assert(day.reflect.length>20);assert(day.reading.length>0);for(const ref of day.reading)assert(ids.has(ref.id),ref.id);assert(day.game.options.length>=3);assert(Number.isInteger(day.game.correct));assert(day.game.correct>=0&&day.game.correct<day.game.options.length);assert(day.game.why.length>30);}
 }
});
test('TechUp preserves every requested strand and the legal references are paired',()=>{
 const text=JSON.stringify(preparationCourses.techup).toLowerCase();for(const topic of ['html','css','javascript','python','canva','figma','excel','power bi','cloud','network','cyber','product','project','marketing','llm','builder','storyteller','strategist'])assert(text.includes(topic),topic);
 const law=preparationCourses.techup.days.find(day=>day.reading.some(ref=>ref.id==='law2015'));assert(law.reading.some(ref=>ref.id==='law2024'));
});
test('ElyTech distinguishes a historical infant theory from school readiness and includes all four skills',()=>{
 const text=JSON.stringify(preparationCourses.elytech).toLowerCase();for(const topic of ['infancy','chisanbop','keyboard','scratch','canva','basic 1','basic 3'])assert(text.includes(topic),topic);
 for(const id of ['child','chisanbop','scratch-book'])assert.equal(preparationResources.find(item=>item.id===id).url,undefined);
});
test('journal export identifies the correct programme/day and does not claim server submission',()=>{
 const value=preparationJournal('techup',8,'My fictional practice note.');assert(value.includes('Follow a message through a network'));assert(value.includes('My fictional practice note.'));assert(value.includes('not a staff-reviewed assignment'));assert.throws(()=>preparationJournal('elytech',15));
});
