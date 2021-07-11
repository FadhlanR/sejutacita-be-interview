export default class UserResponse {
    constructor(id, username, fullname, role, created_at, updated_at) {
        this.id = id;
        this.username = username;
        this.fullname = fullname;
        this.role = role;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }
}