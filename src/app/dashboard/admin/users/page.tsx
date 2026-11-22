"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Loader2, Users } from "lucide-react";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useSession } from "@/lib/auth-client";

interface User {
  _id: string;
  name: string;
  email: string;
  image?: string;
  role: string;
  createdAt?: string;
}

export default function AdminUsersPage() {
  const { data: session } = useSession();

  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/admin/users");
      const data = await res.json();

      setUsers(data);
    } catch (error) {
      toast.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  const handleRoleChange = async (userId: string, role: string) => {
    setUpdatingId(userId);

    try {
      const res = await fetch(
        `http://localhost:5000/api/admin/users/${userId}/role`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ role }),
        }
      );

      if (!res.ok) {
        throw new Error("Role update failed");
      }

      setUsers((prev) =>
        prev.map((user) =>
          user._id === userId ? { ...user, role } : user
        )
      );

      toast.success("User role updated successfully");
    } catch (error) {
      toast.error("Failed to update user role");
    } finally {
      setUpdatingId(null);
    }
  };

  const currentUserEmail = session?.user?.email;

  const roleColors: Record<string, string> = {
    admin: "bg-purple-100 text-purple-700",
    technician: "bg-blue-100 text-blue-700",
    customer: "bg-gray-100 text-gray-700",
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Manage Users</h1>
        <p className="text-muted-foreground">
          Manage FixMate users and their roles.
        </p>
      </div>

      <Card>
        <CardContent className="p-0">
          {loading ? (
            <div className="flex justify-center py-16">
              <Loader2 className="h-8 w-8 animate-spin" />
            </div>
          ) : users.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16">
              <Users className="h-12 w-12 text-muted-foreground mb-3" />
              <p className="text-muted-foreground">No users found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Joined</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {users.map((user) => {
                    const isCurrentUser =
                      user.email === currentUserEmail;

                    return (
                      <TableRow key={user._id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <img
                              src={
                                user.image ||
                                "https://placehold.co/40x40"
                              }
                              alt={user.name}
                              className="h-10 w-10 rounded-full object-cover"
                            />

                            <span className="font-medium whitespace-nowrap">
                              {user.name}
                            </span>
                          </div>
                        </TableCell>

                        <TableCell>{user.email}</TableCell>

                        <TableCell>
                          <span
                            className={`rounded-full px-3 py-1 text-xs font-medium capitalize ${
                              roleColors[user.role] ||
                              "bg-gray-100 text-gray-700"
                            }`}
                          >
                            {user.role}
                          </span>
                        </TableCell>

                        <TableCell>
                          {user.createdAt
                            ? new Date(user.createdAt).toLocaleDateString()
                            : "N/A"}
                        </TableCell>

                        <TableCell>
                          {isCurrentUser ? (
                            <span className="text-xs text-muted-foreground">
                              Your Account
                            </span>
                          ) : (
                            <Select
                              value={user.role}
                              disabled={updatingId === user._id}
                             onValueChange={(role) => {
  if (role) {
    handleRoleChange(user._id, role);
  }
}}
                            >
                              <SelectTrigger className="w-[130px]">
                                {updatingId === user._id ? (
                                  <Loader2 className="h-4 w-4 animate-spin" />
                                ) : (
                                  <SelectValue />
                                )}
                              </SelectTrigger>

                              <SelectContent>
                                <SelectItem value="customer">
                                  Customer
                                </SelectItem>
                                <SelectItem value="technician">
                                  Technician
                                </SelectItem>
                                <SelectItem value="admin">
                                  Admin
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          )}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}