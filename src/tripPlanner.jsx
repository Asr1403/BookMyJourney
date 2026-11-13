
import { useState } from "react";
import {
  MapPin,
  CalendarDays,
  Wallet,
  Plus,
  Trash2,
  Plane,
  Users,
  Clock,
  Car,
  Hotel,
  Luggage,
} from "lucide-react";

function TripPlanner() {
  const [destination, setDestination] = useState("");
  const [days, setDays] = useState(3);
  const [budget, setBudget] = useState("");
  const [startDate, setStartDate] = useState("");
  const [travelers, setTravelers] = useState(1);
  const [transport, setTransport] = useState("Flight");
  const [accommodation, setAccommodation] = useState("");

  const [activity, setActivity] = useState("");
  const [activityTime, setActivityTime] = useState("");
  const [activityLocation, setActivityLocation] = useState("");
  const [activityDay, setActivityDay] = useState("1");
  const [activities, setActivities] = useState([]);

  const totalBudget = Number(budget) || 0;
  const dailyBudget = days > 0 ? totalBudget / days : 0;
  const perPersonBudget =
    travelers > 0 ? totalBudget / travelers : 0;

  const updateDays = (value) => {
    const nextDays = Math.max(1, Math.min(365, Number(value) || 1));

    setDays(nextDays);
    setActivityDay((current) =>
      String(Math.min(Number(current), nextDays))
    );

    setActivities((current) =>
      current.filter((item) => item.day <= nextDays)
    );
  };

  const addActivity = (e) => {
    e.preventDefault();

    if (!activity.trim()) return;

    setActivities((current) => [
      ...current,
      {
        id: Date.now(),
        name: activity.trim(),
        time: activityTime,
        location: activityLocation.trim(),
        day: Number(activityDay),
      },
    ]);

    setActivity("");
    setActivityTime("");
    setActivityLocation("");
  };

  const removeActivity = (id) => {
    setActivities((current) =>
      current.filter((item) => item.id !== id)
    );
  };

  const formatDate = (date, offset) => {
    if (!date) return "";

    const result = new Date(`${date}T12:00:00`);
    result.setDate(result.getDate() + offset);

    return result.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const getDayActivities = (day) =>
    activities
      .filter((item) => item.day === day)
      .sort((a, b) => (a.time || "").localeCompare(b.time || ""));

  return (
    <section className="planner-section" id="planner">
      <div className="section-heading">
        <span className="section-label">YOUR NEXT ADVENTURE</span>
        <h2>Plan your perfect trip.</h2>
        <p>
          Organize your travel details, manage your budget
          and create a day-wise itinerary.
        </p>
      </div>

      <div className="planner-container">
        {/* TRIP DETAILS */}
        <div className="planner-form">
          <h3>
            <Plane size={21} /> Create your trip
          </h3>

          <label>Destination</label>
          <div className="planner-input">
            <MapPin size={18} />
            <input
              type="text"
              placeholder="e.g. Bali, Indonesia"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
            />
          </div>

          <label>Departure date</label>
          <div className="planner-input">
            <CalendarDays size={18} />
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>

          <label>Number of days</label>
          <div className="planner-input">
            <CalendarDays size={18} />
            <input
              type="number"
              min="1"
              max="365"
              value={days}
              onChange={(e) => updateDays(e.target.value)}
            />
          </div>

          <label>Number of travellers</label>
          <div className="planner-input">
            <Users size={18} />
            <input
              type="number"
              min="1"
              max="50"
              value={travelers}
              onChange={(e) =>
                setTravelers(
                  Math.max(1, Math.min(50, Number(e.target.value) || 1))
                )
              }
            />
          </div>

          <label>Travel budget (₹)</label>
          <div className="planner-input">
            <Wallet size={18} />
            <input
              type="number"
              min="0"
              placeholder="Enter your total budget"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
            />
          </div>

          <label>Mode of transport</label>
          <div className="planner-input">
            <Car size={18} />
            <select
              value={transport}
              onChange={(e) => setTransport(e.target.value)}
            >
              <option>Flight</option>
              <option>Train</option>
              <option>Bus</option>
              <option>Car</option>
              <option>Bike</option>
              <option>Other</option>
            </select>
          </div>

          <label>Accommodation</label>
          <div className="planner-input">
            <Hotel size={18} />
            <input
              type="text"
              placeholder="Hotel, resort or Airbnb"
              value={accommodation}
              onChange={(e) => setAccommodation(e.target.value)}
            />
          </div>

          {/* BUDGET SUMMARY */}
          <div className="budget-summary">
            <span>Total Budget</span>
            <strong>
              ₹{totalBudget.toLocaleString("en-IN")}
            </strong>

            <span>Estimated daily budget</span>
            <strong>
              ₹{Math.round(dailyBudget).toLocaleString("en-IN")}
            </strong>

            <span>Budget per traveller</span>
            <strong>
              ₹{Math.round(perPersonBudget).toLocaleString("en-IN")}
            </strong>
          </div>
        </div>

        {/* ITINERARY */}
        <div className="itinerary-panel">
          <h3>
            <CalendarDays size={21} /> Your itinerary
          </h3>

          {/* TRIP SUMMARY */}
          <div className="trip-summary">
            <span>DESTINATION</span>
            <strong>
              {destination.trim() || "Your destination"}
            </strong>

            <span>
              {days} days · {travelers}{" "}
              {travelers === 1 ? "traveller" : "travellers"}
            </span>

            {startDate && (
              <span>
                {formatDate(startDate, 0)} –{" "}
                {formatDate(startDate, days - 1)}
              </span>
            )}

            <div className="trip-extra-details">
              <span>
                <Plane size={15} /> {transport}
              </span>

              {accommodation.trim() && (
                <span>
                  <Hotel size={15} /> {accommodation}
                </span>
              )}
            </div>
          </div>

          {/* ADD ACTIVITY FORM */}
          <div className="activity-form-heading">
            <h4>Add a travel activity</h4>
            <p>Build your itinerary one activity at a time.</p>
          </div>

          <form className="activity-form" onSubmit={addActivity}>
            <input
              type="text"
              placeholder="Activity name (e.g. Visit beach)"
              value={activity}
              onChange={(e) => setActivity(e.target.value)}
              required
            />

            <div className="activity-extra-inputs">
              <div className="planner-input">
                <CalendarDays size={17} />
                <select
                  value={activityDay}
                  onChange={(e) => setActivityDay(e.target.value)}
                >
                  {Array.from({ length: days }, (_, index) => (
                    <option key={index + 1} value={index + 1}>
                      Day {index + 1}
                    </option>
                  ))}
                </select>
              </div>

              <div className="planner-input">
                <Clock size={17} />
                <input
                  type="time"
                  value={activityTime}
                  onChange={(e) => setActivityTime(e.target.value)}
                />
              </div>
            </div>

            <div className="planner-input">
              <MapPin size={17} />
              <input
                type="text"
                placeholder="Activity location (optional)"
                value={activityLocation}
                onChange={(e) => setActivityLocation(e.target.value)}
              />
            </div>

            <button type="submit" className="add-activity-button">
              <Plus size={19} /> Add activity
            </button>
          </form>

          {/* DAY-WISE ITINERARY */}
          <div className="day-wise-itinerary">
            {Array.from({ length: days }, (_, index) => {
              const day = index + 1;
              const dayActivities = getDayActivities(day);

              return (
                <div className="itinerary-day" key={day}>
                  <div className="itinerary-day-heading">
                    <div>
                      <span className="day-label">DAY {day}</span>
                      <h4>
                        {startDate
                          ? formatDate(startDate, index)
                          : `Day ${day} of your trip`}
                      </h4>
                    </div>

                    <span className="day-activity-count">
                      {dayActivities.length} activities
                    </span>
                  </div>

                  {dayActivities.length === 0 ? (
                    <div className="empty-activities">
                      <CalendarDays size={25} />
                      <p>No activities planned for this day.</p>
                      <span>
                        Add something exciting to your itinerary.
                      </span>
                    </div>
                  ) : (
                    <div className="activity-list">
                      {dayActivities.map((item, index) => (
                        <div className="activity-item" key={item.id}>
                          <div className="activity-number">
                            {index + 1}
                          </div>

                          <div className="activity-details">
                            <strong>{item.name}</strong>

                            {item.time && (
                              <span>
                                <Clock size={13} /> {item.time}
                              </span>
                            )}

                            {item.location && (
                              <span>
                                <MapPin size={13} /> {item.location}
                              </span>
                            )}
                          </div>

                          <button
                            type="button"
                            onClick={() => removeActivity(item.id)}
                            aria-label={`Remove ${item.name}`}
                          >
                            <Trash2 size={17} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* TOTAL ACTIVITY COUNT */}
          <div className="activity-count">
            <Luggage size={17} />
            {activities.length} activities planned across {days} days
          </div>
        </div>
      </div>
    </section>
  );
}

export default TripPlanner;
