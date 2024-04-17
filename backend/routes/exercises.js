const router = require("express").Router();
const Exercise = require("../models/exercise.model");

router.route("/").get((req, res) => {
  Exercise.find()
    .then((exercises) => res.status(200).json(exercises))
    .catch((err) => res.status(400).json("Error " + err));
});

router.route('/add').post((req, res) => {
    const {
        def_name,
        def_addr,
        crime_type,
        crime_date,
        crime_location,
        ao_name,
        arrest_date,
        judge_name,
        lawyer_name,
        prosecutor_name,
        start_date,
        end_date,
        status,
        summaries,
        next_hearing,
        hearing_slot,
    } = req.body;

    const newExercise = new Exercise({
        def_name,
        def_addr,
        crime_type,
        crime_date,
        crime_location,
        ao_name,
        arrest_date,
        judge_name,
        lawyer_name,
        prosecutor_name,
        start_date,
        end_date,
        status,
        summaries,
        next_hearing: {date: next_hearing, slot: hearing_slot}
    });

    console.log(newExercise);

    newExercise.save()
        .then(() => res.status(200).json('Exercise added!'))
        .catch(err => res.json('Error ' + err));
});

router.route("/emptyslots").get(async (req, res) => {
  try {
    console.log('fffffff');
    const startDate = new Date();
    const endDate = new Date();
    endDate.setDate(startDate.getDate() + 30);

    const slots = [1, 2];
    const emptySlots = {};

    for (let d = startDate; d <= endDate; d.setDate(d.getDate() + 1)) {
      if(d.getDay() === 0 || d.getDay() === 6) continue; // skip weekends
      const resp = await Exercise.find({ "next_hearing.date": d }).select(
        "next_hearing"
      );
      const filled = resp.map((x) => x.next_hearing.slot);
      const empty = slots.filter((x) => !filled.includes(x));
      emptySlots[d.toISOString().split("T")[0]] = empty;
    }
    res.status(200).json(emptySlots);
  } catch (e) {
    console.log(e);
    res.status(400).json("Error " + e);
  }
});

router.route('/:id').get((req, res) => {
    Exercise.findById(req.params.id)
        .then(exercise => res.status(200).json(exercise))
        .catch(err => res.json('Error ' + err));
});

router.route('/:id').delete((req, res) => {
    Exercise.findByIdAndDelete(req.params.id)
        .then(() => res.status(200).json("Exercise deleted"))
        .catch(err => res.json('Error ' + err));
});

router.route('/update/:id').post((req, res) => {
    Exercise.findByIdAndUpdate(req.params.id, req.body)
        .then(exercise => {
            exercise.def_name = req.body.def_name;
            exercise.def_addr = req.body.def_addr;
            exercise.crime_type = req.body.crime_date;
            exercise.crime_date = Date.parse(req.body.crime_date);
            exercise.crime_location = req.body.crime_location;
            exercise.ao_name = req.body.ao_name;
            exercise.arrest_date = req.body.arrest_date;
            exercise.judge_name = req.body.judge_name;
            exercise.lawyer_name = req.body.lawyer_name;
            exercise.prosecutor_name = req.body.prosecutor_name;
            exercise.start_date = Date.parse(req.body.start_date);
            exercise.end_date = Date.parse(req.body.end_date);
            exercise.status = req.body.status;
            exercise.summaries = req.body.summaries;

            exercise.save()
                .then(() => res.status(200).json('Updated'))
                .catch(err => res.status(400).json('Error ' + err));
        })
        .catch(err => res.status(400).json('Error ' + err));

});

module.exports = router;
