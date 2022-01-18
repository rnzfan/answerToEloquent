const roads = [
  "Alice's House-Bob's House",   "Alice's House-Cabin",
  "Alice's House-Post Office",   "Bob's House-Town Hall",
  "Daria's House-Ernie's House", "Daria's House-Town Hall",
  "Ernie's House-Grete's House", "Grete's House-Farm",
  "Grete's House-Shop",          "Marketplace-Farm",
  "Marketplace-Post Office",     "Marketplace-Shop",
  "Marketplace-Town Hall",       "Shop-Town Hall"
];

function buildGraph(edges) {
  let graph = Object.create(null);
  function addEdge(from, to) {
    if (graph[from] == null) {
      graph[from] = [to];
    } else {
      graph[from].push(to);
    }
  }
  for (let [from, to] of edges.map(r => r.split("-"))) {
    addEdge(from, to);
    addEdge(to, from);
  }
  return graph;
}

const roadGraph = buildGraph(roads);

class VillageState {
  constructor(place, parcels) {
    this.place = place;
    this.parcels = parcels;
  }

  move(destination) {
    if (!roadGraph[this.place].includes(destination)) {
      return this;
    } else {
      let parcels = this.parcels.map(p => {
        if (p.place != this.place) return p; //the place of robot is not the place of parcel
        return {place: destination, address: p.address};
      }).filter(p => p.place != p.address);
      return new VillageState(destination, parcels);
    }
  }
}

/* the main function */
function runRobot(state, robot, memory) {
  console.log(state.parcels);
  console.log('\n');
  for (let turn = 0;; turn++) {
    if (state.parcels.length == 0) {
      console.log(`Done in ${turn} turns`);
      break;
    }
    let action = robot(state, memory);
    state = state.move(action.direction);
    memory = action.memory;
    
    console.log(`Robot moved to ${action.direction}`);
    console.log(state.parcels);
    console.log('\n');
  }
}

function randomPick(array) {
  let choice = Math.floor(Math.random() * array.length);
  return array[choice];
}
/* The most dummy robot */
function randomRobot(state) {
  return {direction: randomPick(roadGraph[state.place])};
}

/* initial the state, say there are 5x parcels today */
VillageState.random = function(parcelCount = 5) {
  let parcels = [];
  for (let i = 0; i < 5; i++) {
    let address = randomPick(Object.keys(roadGraph));
    let place;
    do {
      place = randomPick(Object.keys(roadGraph));
    } while (place == address);
    parcels.push({place, address});
  }
  return new VillageState("Post Office", parcels);
};

/* a constant route for routerobot */
const mailRoute = [
  "Alice's House", "Cabin", "Alice's House", "Bob's House",
  "Town Hall", "Daria's House", "Ernie's House",
  "Grete's House", "Shop", "Grete's House", "Farm",
  "Marketplace", "Post Office"
];

/* A robot always walks the same route */
function routeRobot(state, memory) {
  if (memory.length == 0) {
    memory = mailRoute;
  }
  return {direction: memory[0], memory: memory.slice(1)};
}

function findRoute(graph, from, to) {
  let work = [{at: from, route: []}];
  for (let i = 0; i < work.length; i++) { //work.length is growing
    let {at, route} = work[i];
    for (let place of graph[at]) {
      if (place == to) return route.concat(place); // finally found a full route
      if (!work.some(w => w.at == place)) { // not go back the original place
        work.push({at: place, route: route.concat(place)}); // add place to the route list
      }
    }
  }
}

function goalOrientedRobot({place, parcels}, route) {
  if (route.length == 0) {
    let parcel = parcels[0];
    if (parcel.place != place) {
      route = findRoute(roadGraph, place, parcel.place);
    } else {
      route = findRoute(roadGraph, place, parcel.address);
    }
  }
  return {direction: route[0], memory: route.slice(1)};
}

/* Run the program */
// runRobot(VillageState.random(), goalOrientedRobotR1, []);


/* Exercises below */

function compareRobots(robot1, memory1, robot2, memory2) {
  let result1 = [];
  let result2 = [];
  for (let i = 0; i<100; i++) {
    let state1 = VillageState.random();
    let state2 = state1;

    for (let turn = 0;; turn++) {
      if (state1.parcels.length == 0) {
        result1[i] = turn;
        break;
      }
      let action = robot1(state1, memory1);
      state1 = state1.move(action.direction);
      memory1 = action.memory;
    }

    for (let turn = 0;; turn++) {
      if (state2.parcels.length == 0) {
        result2[i] = turn;
        break;
      }
      let action = robot2(state2, memory2);
      state2 = state2.move(action.direction);
      memory2 = action.memory;
    }
  }
  return console.log(`Robot1 Avg Turns: ${((result1.reduce((a,b)=>a+b))/100)}, Robot2 Avg Turns: ${((result2.reduce((a,b)=>a+b))/100)}`);
}

function selectParcel(graph, place, parcels) {
  for (let i = 0; i < parcels.length; i++) {
    if (graph[place].includes(parcels[i].place)) {
      //console.log(`selected ${parcels[i].place}`);
      return parcels[i];
    }
  }
  return parcels[0];
}

function goalOrientedRobotR1({place, parcels}, route) {
  if (route.length == 0) {
    let parcel = selectParcel(roadGraph, place, parcels); //selected a closeby parcel
    if (parcel.place != place) {
      route = findRoute(roadGraph, place, parcel.place);
    } else {
      route = findRoute(roadGraph, place, parcel.address);
    }
  }
  return {direction: route[0], memory: route.slice(1)};
}

function lazyRobot({place, parcels}, route) {
  if (route.length == 0) {
    // Describe a route for every parcel
    let routes = parcels.map(parcel => {
      if (parcel.place != place) {
        return {route: findRoute(roadGraph, place, parcel.place),
                pickUp: true};
      } else {
        return {route: findRoute(roadGraph, place, parcel.address),
                pickUp: false};
      }
    });

    // This determines the precedence a route gets when choosing.
    // Route length counts negatively, routes that pick up a package
    // get a small bonus.
    function score({route, pickUp}) {
      return (pickUp ? 0.5 : 0) - route.length;
    }
    route = routes.reduce((a, b) => score(a) > score(b) ? a : b).route;
  }

  return {direction: route[0], memory: route.slice(1)};
}

// compareRobots(goalOrientedRobotR1, [], lazyRobot, []);


